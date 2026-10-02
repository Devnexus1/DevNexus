from flask import current_app
from flask_mail import Message as MailMessage

from ..extensions import mail


def send_contact_email(data):
    """
    ایمیل اطلاع‌رسانی پیام جدید را برای ادمین می‌فرستد.
    data یک dict ساده است (نه آبجکت دیتابیس) تا در Thread هم امن باشد.
    باید داخل app_context صدا زده شود.
    """
    admin_email = current_app.config.get("ADMIN_EMAIL")

    if not admin_email or not current_app.config.get("MAIL_USERNAME"):
        return False

    subject = f"پیام جدید در سایت Dev Nexus - {data['name']}"

    body = (
        "یک پیام جدید از فرم تماس سایت Dev Nexus دریافت شد.\n\n"
        f"نام: {data['name']}\n"
        f"ایمیل: {data['email']}\n"
        f"تلفن: {data['phone'] or '-'}\n"
        f"نوع پروژه: {data['project_type'] or '-'}\n\n"
        f"متن پیام:\n{data['message']}\n"
    )

    try:
        msg = MailMessage(
            subject=subject,
            recipients=[admin_email],
            body=body,
            reply_to=data["email"]
        )
        mail.send(msg)
        return True

    except Exception as error:
        current_app.logger.warning("Email notification failed: %s", error)
        return False
