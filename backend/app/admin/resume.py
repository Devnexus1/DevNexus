import os
import uuid

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    current_app,
    send_from_directory
)

from flask_login import login_required
from werkzeug.utils import secure_filename

from ..extensions import db
from ..models import Resume


resume_bp = Blueprint(
    "resume",
    __name__,
    url_prefix="/admin/resume"
)


# =========================================================
# Allowed Resume Extensions
# =========================================================

ALLOWED_RESUME_EXTENSIONS = {
    "pdf",
    "doc",
    "docx"
}


def allowed_resume(filename):
    """
    Check whether the uploaded resume format is allowed.
    """

    if not filename:
        return False

    if "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in ALLOWED_RESUME_EXTENSIONS


# =========================================================
# Resume Management
# =========================================================

@resume_bp.route("/", methods=["GET", "POST"])
@login_required
def resume():

    if request.method == "POST":

        file = request.files.get("resume")

        # -------------------------------------------------
        # Check file
        # -------------------------------------------------

        if not file or not file.filename:

            flash(
                "لطفاً یک فایل CV انتخاب کنید.",
                "error"
            )

            return redirect(
                url_for("resume.resume")
            )

        # -------------------------------------------------
        # Check extension
        # -------------------------------------------------

        if not allowed_resume(file.filename):

            flash(
                "فرمت فایل مجاز نیست. فقط PDF, DOC و DOCX مجاز هستند.",
                "error"
            )

            return redirect(
                url_for("resume.resume")
            )

        # -------------------------------------------------
        # Check size
        # -------------------------------------------------

        file.stream.seek(0, os.SEEK_END)
        file_size = file.stream.tell()
        file.stream.seek(0)

        if file_size > current_app.config["MAX_RESUME_SIZE"]:

            flash(
                "حجم فایل CV نباید بیشتر از ۸ مگابایت باشد.",
                "error"
            )

            return redirect(
                url_for("resume.resume")
            )

        # -------------------------------------------------
        # Prepare upload folder
        # -------------------------------------------------

        upload_folder = os.path.join(
            current_app.config["UPLOAD_FOLDER"],
            "resume"
        )

        os.makedirs(
            upload_folder,
            exist_ok=True
        )

        # -------------------------------------------------
        # Filename
        # (نام فارسی مثل «رزومه.pdf» با secure_filename خالی می‌شد و خطا می‌داد)
        # -------------------------------------------------

        extension = file.filename.rsplit(".", 1)[1].lower()

        original_filename = secure_filename(file.filename)

        if "." not in original_filename:
            original_filename = f"resume.{extension}"

        unique_filename = f"resume_{uuid.uuid4().hex}.{extension}"

        file.save(
            os.path.join(
                upload_folder,
                unique_filename
            )
        )

        # -------------------------------------------------
        # Deactivate previous resumes
        # -------------------------------------------------

        Resume.query.update(
            {
                Resume.is_active: False
            }
        )

        # -------------------------------------------------
        # Create new resume
        # -------------------------------------------------

        new_resume = Resume(
            filename=unique_filename,
            original_filename=original_filename,
            is_active=True
        )

        db.session.add(new_resume)

        db.session.commit()

        flash(
            "CV جدید با موفقیت آپلود و فعال شد.",
            "success"
        )

        return redirect(
            url_for("resume.resume")
        )

    # -----------------------------------------------------
    # Get all resumes
    # -----------------------------------------------------

    resumes = Resume.query.order_by(
        Resume.uploaded_at.desc()
    ).all()

    return render_template(
        "admin/resume.html",
        resumes=resumes
    )


# =========================================================
# Activate Resume
# =========================================================

@resume_bp.route(
    "/<int:resume_id>/activate",
    methods=["POST"]
)
@login_required
def activate_resume(resume_id):

    selected_resume = Resume.query.get_or_404(
        resume_id
    )

    # Deactivate all resumes
    Resume.query.update(
        {
            Resume.is_active: False
        }
    )

    # Activate selected resume
    selected_resume.is_active = True

    db.session.commit()

    flash(
        "این CV به عنوان CV فعال انتخاب شد.",
        "success"
    )

    return redirect(
        url_for("resume.resume")
    )


# =========================================================
# Delete Resume
# =========================================================

@resume_bp.route(
    "/<int:resume_id>/delete",
    methods=["POST"]
)
@login_required
def delete_resume(resume_id):

    selected_resume = Resume.query.get_or_404(
        resume_id
    )

    was_active = selected_resume.is_active

    # -------------------------------------------------
    # Delete physical file
    # -------------------------------------------------

    upload_folder = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        "resume"
    )

    file_path = os.path.join(
        upload_folder,
        selected_resume.filename
    )

    if os.path.exists(file_path):

        os.remove(file_path)

    # -------------------------------------------------
    # Delete database record
    # -------------------------------------------------

    db.session.delete(
        selected_resume
    )

    db.session.commit()

    if was_active:
        flash(
            "CV فعال حذف شد. تا CV جدیدی فعال نکنی، دکمه‌ی «دانلود رزومه» در سایت نمایش داده نمی‌شود.",
            "success"
        )
    else:
        flash(
            "CV با موفقیت حذف شد.",
            "success"
        )

    return redirect(
        url_for("resume.resume")
    )


# =========================================================
# Download a specific resume (admin only)
# (قبلاً دکمه‌ی دانلود هر ردیف همیشه CV فعال را می‌داد)
# =========================================================

@resume_bp.route("/<int:resume_id>/download")
@login_required
def admin_download_resume(resume_id):

    selected_resume = Resume.query.get_or_404(
        resume_id
    )

    upload_folder = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        "resume"
    )

    return send_from_directory(
        upload_folder,
        selected_resume.filename,
        as_attachment=True,
        download_name=selected_resume.original_filename
    )
