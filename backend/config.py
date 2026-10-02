import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent

# همیشه .env کنار همین فایل خوانده می‌شود (مستقل از پوشه‌ای که برنامه را از آنجا اجرا می‌کنی)
load_dotenv(BASE_DIR / ".env")


def _as_bool(value, default=False):
    if value is None:
        return default
    return str(value).strip().lower() in ("1", "true", "yes", "on")


def _upload_folder():
    folder = os.getenv("UPLOAD_FOLDER") or "uploads"
    path = Path(folder)
    if not path.is_absolute():
        # قبلاً مسیر نسبی بود و به پوشه‌ی اجرای برنامه بستگی داشت
        path = BASE_DIR / path
    return str(path)


def _admin_email():
    """ADMIN_EMAIL باید یک ایمیل واقعی باشد؛ اگر اشتباه پر شده بود، به ایمیل فرستنده برمی‌گردیم."""
    value = (os.getenv("ADMIN_EMAIL") or "").strip()
    if "@" in value and " " not in value:
        return value
    return (os.getenv("MAIL_USERNAME") or "").strip()


class Config:

    SECRET_KEY = os.getenv("SECRET_KEY") or "dev-only-change-this-secret-key"

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or "sqlite:///devnexus.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ---------- Email ----------
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = _as_bool(os.getenv("MAIL_USE_TLS"), True)
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER") or os.getenv("MAIL_USERNAME", "")
    ADMIN_EMAIL = _admin_email()

    # ---------- اعلان روی گوشی (اختیاری) ----------
    ADMIN_PHONE = os.getenv("ADMIN_PHONE", "")
    KAVENEGAR_API_KEY = os.getenv("KAVENEGAR_API_KEY", "")
    KAVENEGAR_SENDER = os.getenv("KAVENEGAR_SENDER", "")
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

    # ---------- آپلود ----------
    UPLOAD_FOLDER = _upload_folder()
    MAX_IMAGE_SIZE = 8 * 1024 * 1024          # هر تصویر حداکثر ۸ مگابایت
    MAX_IMAGES_PER_PROJECT = 12               # حداکثر ۱۲ تصویر برای هر پروژه
    MAX_RESUME_SIZE = 8 * 1024 * 1024
    MAX_CONTENT_LENGTH = 110 * 1024 * 1024    # سقف کل یک درخواست

    # ---------- Session ----------
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
