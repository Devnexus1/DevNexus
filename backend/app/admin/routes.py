from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask_login import login_required, current_user

from ..extensions import db
from ..models import Project, Message, Resume
from ..services.notify import sms_enabled, telegram_enabled, email_enabled


admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/admin"
)


@admin_bp.route("/")
@login_required
def dashboard():
    config = current_app.config

    stats = {
        "published_projects": Project.query.filter_by(is_published=True).count(),
        "total_messages": Message.query.count(),
        "unread_messages": Message.query.filter_by(is_read=False).count(),
        "has_resume": Resume.query.filter_by(is_active=True).first() is not None,
    }

    latest_messages = Message.query.order_by(
        Message.created_at.desc()
    ).limit(5).all()

    channels = {
        "email": email_enabled(config),
        "sms": sms_enabled(config),
        "telegram": telegram_enabled(config),
    }

    return render_template(
        "admin/dashboard.html",
        stats=stats,
        latest_messages=latest_messages,
        channels=channels
    )


@admin_bp.route("/password", methods=["GET", "POST"])
@login_required
def change_password():
    if request.method == "POST":
        current_password = request.form.get("current_password", "")
        new_password = request.form.get("new_password", "")
        confirm_password = request.form.get("confirm_password", "")

        if not current_user.check_password(current_password):
            flash("رمز فعلی اشتباه است.", "error")

        elif len(new_password) < 8:
            flash("رمز جدید باید حداقل ۸ کاراکتر باشد.", "error")

        elif new_password != confirm_password:
            flash("رمز جدید و تکرار آن یکسان نیستند.", "error")

        elif new_password == current_password:
            flash("رمز جدید نباید با رمز فعلی یکسان باشد.", "error")

        else:
            current_user.set_password(new_password)
            db.session.commit()

            flash("رمز عبور با موفقیت تغییر کرد.", "success")
            return redirect(url_for("admin.change_password"))

    return render_template("admin/password.html")
