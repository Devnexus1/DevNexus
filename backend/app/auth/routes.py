from datetime import datetime

from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user

from ..extensions import db
from ..models import Admin


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/auth"
)


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("admin.dashboard"))

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        admin = Admin.query.filter_by(username=username).first()

        if admin and admin.is_active and admin.check_password(password):
            login_user(admin)

            admin.last_login = datetime.utcnow()
            db.session.commit()

            return redirect(url_for("admin.dashboard"))

        return render_template(
            "auth/login.html",
            error="نام کاربری یا رمز عبور اشتباه است."
        )

    return render_template("auth/login.html")


# خروج با POST (و توکن CSRF) انجام می‌شود تا با یک لینک ساده از بیرون قابل اجرا نباشد
@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))
