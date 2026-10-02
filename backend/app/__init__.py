import hmac
import os
import secrets

from flask import Flask, abort, request, session
from flask_login import current_user

from config import Config
from .models import Admin, Project, ProjectImage, Message, Resume
from .auth.routes import auth_bp
from .admin.projects import projects_bp
from .admin.routes import admin_bp
from .admin.resume import resume_bp
from .admin.messages import messages_bp
from .public.contact import contact_bp
from .public.frontend import frontend_bp
from .public.api import api_bp
from .extensions import db, login_manager, migrate, mail


PROJECT_TYPE_LABELS = {
    "website": "وب‌سایت",
    "web-application": "اپلیکیشن وب",
    "frontend": "فرانت‌اند",
    "backend": "بک‌اند",
    "database": "دیتابیس",
    "other": "سایر",
}


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    if app.config["SECRET_KEY"] == "dev-only-change-this-secret-key":
        app.logger.warning(
            "SECRET_KEY تنظیم نشده است! در فایل .env یک مقدار تصادفی بگذار."
        )

    os.makedirs(os.path.join(app.config["UPLOAD_FOLDER"], "projects"), exist_ok=True)
    os.makedirs(os.path.join(app.config["UPLOAD_FOLDER"], "resume"), exist_ok=True)

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(Admin, int(user_id))

    # =====================================================
    # CSRF: هر فرم POST در پنل ادمین باید csrf_token داشته باشد
    # =====================================================

    def csrf_token():
        if "_csrf" not in session:
            session["_csrf"] = secrets.token_hex(16)
        return session["_csrf"]

    app.jinja_env.globals["csrf_token"] = csrf_token

    @app.before_request
    def csrf_protect():
        if request.method != "POST":
            return

        if not request.path.startswith(("/admin", "/auth")):
            return

        sent = request.form.get("csrf_token", "")
        expected = session.get("_csrf", "")

        if not sent or not expected or not hmac.compare_digest(sent, expected):
            abort(400, description="توکن امنیتی نامعتبر است. صفحه را دوباره باز کن.")

    # =====================================================
    # دادهٔ مشترک قالب‌های ادمین (تعداد پیام‌های خوانده‌نشده)
    # =====================================================

    @app.context_processor
    def admin_context():
        if request.path.startswith("/admin") and current_user.is_authenticated:
            return {
                "unread_count": Message.query.filter_by(is_read=False).count()
            }
        return {}

    @app.template_filter("project_type")
    def project_type_filter(value):
        return PROJECT_TYPE_LABELS.get(value, value or "-")

    @app.template_filter("dt")
    def datetime_filter(value):
        return value.strftime("%Y-%m-%d %H:%M") if value else "-"

    app.register_blueprint(auth_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(messages_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(frontend_bp)

    return app
