# Dev Nexus

ساختار پوشه‌ها (همان ساختاری که `frontend.py` انتظار دارد):

```
DevNexus/
├── index.html
├── project-detail.html
├── css/   js/   image/        ← پوشه‌ی image را خودت کنارش بگذار
└── backend/
```

## اجرا

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env            # و مقادیرش را پر کن (SECRET_KEY، ایمیل، ...)
flask --app run db upgrade      # ستون‌های جدید توضیح کوتاه پروژه را به دیتابیس اضافه می‌کند
python create_admin.py          # فقط اگر هنوز ادمین نساخته‌ای
python run.py
```

سایت: http://127.0.0.1:5000  |  پنل: http://127.0.0.1:5000/admin

> فایل دیتابیس قبلی‌ات (`backend/instance/devnexus.db`) را دوباره در همان مسیر بگذار؛
> دستور `db upgrade` اطلاعات قبلی را نگه می‌دارد و فقط ستون‌های جدید را اضافه می‌کند.

## اعلان پیام جدید
- **ایمیل**: `MAIL_USERNAME`، `MAIL_PASSWORD` (App Password گوگل) و `ADMIN_EMAIL` را پر کن.
- **پیامک (کاوه‌نگار)**: `KAVENEGAR_API_KEY` و `ADMIN_PHONE` (و در صورت نیاز `KAVENEGAR_SENDER`).
- **تلگرام**: `TELEGRAM_BOT_TOKEN` و `TELEGRAM_CHAT_ID`.

وضعیت هر کانال در داشبورد پنل نمایش داده می‌شود.
