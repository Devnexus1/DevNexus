"""
اطلاع‌رسانی پیام جدید: ایمیل + (اختیاری) پیامک کاوه‌نگار + (اختیاری) تلفگرام.
همه‌ی کانال‌ها در پس‌زمینه اجرا می‌شوند تا ارسال فرم برای بازدیدکننده کند نشود،
و خطای هر کانال هرگز جلوی ذخیره‌ی پیام را نمی‌گیرد.
"""
import json
import threading
import urllib.parse
import urllib.request

from flask import current_app

from .email_service import send_contact_email


def sms_enabled(config):
    return bool(config.get("KAVENEGAR_API_KEY") and config.get("ADMIN_PHONE"))


def telegram_enabled(config):
    return bool(config.get("TELEGRAM_BOT_TOKEN") and config.get("TELEGRAM_CHAT_ID"))


def email_enabled(config):
    return bool(config.get("ADMIN_EMAIL") and config.get("MAIL_USERNAME") and config.get("MAIL_PASSWORD"))


def _short_text(data):
    text = (
        f"پیام جدید در Dev Nexus\n"
        f"از: {data['name']}\n"
        f"تلفن: {data['phone'] or '-'}\n"
        f"{data['message'][:160]}"
    )
    return text


def _send_sms(config, data):
    params = {
        "receptor": config["ADMIN_PHONE"],
        "message": _short_text(data),
    }
    if config.get("KAVENEGAR_SENDER"):
        params["sender"] = config["KAVENEGAR_SENDER"]

    url = (
        f"https://api.kavenegar.com/v1/{config['KAVENEGAR_API_KEY']}/sms/send.json?"
        + urllib.parse.urlencode(params)
    )
    urllib.request.urlopen(url, timeout=10).read()


def _send_telegram(config, data):
    url = f"https://api.telegram.org/bot{config['TELEGRAM_BOT_TOKEN']}/sendMessage"
    payload = json.dumps({
        "chat_id": config["TELEGRAM_CHAT_ID"],
        "text": _short_text(data) + f"\nایمیل: {data['email']}",
    }).encode("utf-8")

    request = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    urllib.request.urlopen(request, timeout=10).read()


def _run(app, data):
    with app.app_context():
        config = app.config

        if email_enabled(config):
            send_contact_email(data)

        if sms_enabled(config):
            try:
                _send_sms(config, data)
            except Exception as error:
                app.logger.warning("SMS notification failed: %s", error)

        if telegram_enabled(config):
            try:
                _send_telegram(config, data)
            except Exception as error:
                app.logger.warning("Telegram notification failed: %s", error)


def notify_new_message(message):
    """message: آبجکت Message که هم‌اکنون در دیتابیس ذخیره شده است."""
    data = {
        "name": message.name,
        "email": message.email,
        "phone": message.phone,
        "project_type": message.project_type,
        "message": message.message,
    }

    app = current_app._get_current_object()

    thread = threading.Thread(target=_run, args=(app, data), daemon=True)
    thread.start()
