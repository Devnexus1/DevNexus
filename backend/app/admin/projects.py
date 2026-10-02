import os
import uuid

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    current_app
)

from flask_login import login_required

from ..extensions import db
from ..models import Project, ProjectImage


projects_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/admin/projects"
)


ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}


# =========================================================
# Helpers
# =========================================================

def upload_folder():
    folder = os.path.join(current_app.config["UPLOAD_FOLDER"], "projects")
    os.makedirs(folder, exist_ok=True)
    return folder


def detect_image_type(stream):
    """
    نوع واقعی فایل را از روی ۱۲ بایت اول تشخیص می‌دهد
    (فقط به پسوند اسم فایل اعتماد نمی‌کنیم).
    """
    head = stream.read(12)
    stream.seek(0)

    if head.startswith(b"\xff\xd8\xff"):
        return "jpg"

    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"

    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"

    return None


def stream_size(stream):
    stream.seek(0, os.SEEK_END)
    size = stream.tell()
    stream.seek(0)
    return size


def save_uploaded_images(project, files):
    """
    تصاویر آپلودشده را ذخیره می‌کند و پیام خطا/موفقیت را flash می‌کند.
    اولین تصویر پروژه به‌طور خودکار کاور می‌شود.
    """
    files = [f for f in files if f and f.filename]

    if not files:
        return

    max_images = current_app.config["MAX_IMAGES_PER_PROJECT"]
    max_size = current_app.config["MAX_IMAGE_SIZE"]

    existing_count = ProjectImage.query.filter_by(project_id=project.id).count()
    next_order = existing_count
    saved = 0

    for file in files:

        if existing_count + saved >= max_images:
            flash(f"حداکثر {max_images} تصویر برای هر پروژه مجاز است.", "error")
            break

        extension = (
            file.filename.rsplit(".", 1)[1].lower()
            if "." in file.filename else ""
        )

        if extension not in ALLOWED_IMAGE_EXTENSIONS:
            flash(f"فرمت «{file.filename}» مجاز نیست (فقط JPG، PNG و WEBP).", "error")
            continue

        if stream_size(file.stream) > max_size:
            flash(f"حجم «{file.filename}» بیشتر از ۸ مگابایت است.", "error")
            continue

        real_type = detect_image_type(file.stream)

        if not real_type:
            flash(f"«{file.filename}» یک تصویر معتبر نیست.", "error")
            continue

        # نام تصادفی: هم تداخل ندارد، هم اسم فارسی/خاص فایل مشکلی ایجاد نمی‌کند
        final_filename = f"{uuid.uuid4().hex}.{real_type}"

        file.save(os.path.join(upload_folder(), final_filename))

        db.session.add(ProjectImage(
            project_id=project.id,
            filename=final_filename,
            alt_text=project.title_en,
            display_order=next_order,
            is_primary=(existing_count + saved == 0)
        ))

        next_order += 1
        saved += 1

    db.session.commit()

    if saved:
        flash(f"{saved} تصویر اضافه شد.", "success")


def ensure_primary_image(project):
    images = ProjectImage.query.filter_by(
        project_id=project.id
    ).order_by(ProjectImage.display_order.asc(), ProjectImage.id.asc()).all()

    if images and not any(img.is_primary for img in images):
        images[0].is_primary = True
        db.session.commit()


def read_form():
    form = request.form

    def text(name):
        return form.get(name, "").strip()

    try:
        display_order = max(0, int(text("display_order") or 0))
    except ValueError:
        display_order = 0

    return {
        "title_en": text("title_en"),
        "title_fa": text("title_fa"),
        "short_description_en": text("short_description_en"),
        "short_description_fa": text("short_description_fa"),
        "description_en": text("description_en"),
        "description_fa": text("description_fa"),
        "technologies": text("technologies"),
        "live_demo_url": text("live_demo_url"),
        "github_url": text("github_url"),
        "display_order": display_order,
        "is_published": form.get("is_published") == "on",
    }


def validate(data):
    if not data["title_en"]:
        return "عنوان انگلیسی پروژه الزامی است."

    for field, label in (("live_demo_url", "Live Demo"), ("github_url", "GitHub")):
        value = data[field]
        if value and not value.lower().startswith(("http://", "https://")):
            return f"لینک {label} باید با http:// یا https:// شروع شود."

    return None


def apply_data(project, data):
    project.title_en = data["title_en"]
    project.title_fa = data["title_fa"] or None
    project.short_description_en = data["short_description_en"] or None
    project.short_description_fa = data["short_description_fa"] or None
    project.description_en = data["description_en"]
    project.description_fa = data["description_fa"] or None
    project.technologies = data["technologies"] or None
    project.live_demo_url = data["live_demo_url"] or None
    project.github_url = data["github_url"] or None
    project.display_order = data["display_order"]
    project.is_published = data["is_published"]


def form_defaults(project=None):
    if project is None:
        return {"display_order": 0, "is_published": False}

    return {
        "title_en": project.title_en,
        "title_fa": project.title_fa or "",
        "short_description_en": project.short_description_en or "",
        "short_description_fa": project.short_description_fa or "",
        "description_en": project.description_en or "",
        "description_fa": project.description_fa or "",
        "technologies": project.technologies or "",
        "live_demo_url": project.live_demo_url or "",
        "github_url": project.github_url or "",
        "display_order": project.display_order,
        "is_published": project.is_published,
    }


# =========================================================
# Projects List
# =========================================================

@projects_bp.route("/")
@login_required
def projects():

    projects = Project.query.order_by(
        Project.display_order.asc(),
        Project.created_at.desc()
    ).all()

    return render_template(
        "admin/projects.html",
        projects=projects
    )


# =========================================================
# Add New Project
# =========================================================

@projects_bp.route("/new", methods=["GET", "POST"])
@login_required
def new_project():

    if request.method == "POST":

        data = read_form()
        error = validate(data)

        if error:
            flash(error, "error")

            # اطلاعاتی که کاربر وارد کرده از بین نمی‌رود
            return render_template(
                "admin/project-edit.html",
                project=None,
                images=[],
                data=data
            )

        project = Project()
        apply_data(project, data)

        db.session.add(project)
        db.session.commit()

        save_uploaded_images(project, request.files.getlist("project_images"))

        flash("پروژه با موفقیت اضافه شد.", "success")

        return redirect(url_for("projects.projects"))

    return render_template(
        "admin/project-edit.html",
        project=None,
        images=[],
        data=form_defaults()
    )


# =========================================================
# Edit Project
# =========================================================

@projects_bp.route(
    "/<int:project_id>/edit",
    methods=["GET", "POST"]
)
@login_required
def edit_project(project_id):

    project = Project.query.get_or_404(project_id)

    if request.method == "POST":

        data = read_form()
        error = validate(data)

        if error:
            flash(error, "error")

            return render_template(
                "admin/project-edit.html",
                project=project,
                images=project.sorted_images,
                data=data
            )

        apply_data(project, data)
        db.session.commit()

        save_uploaded_images(project, request.files.getlist("project_images"))

        flash("پروژه با موفقیت ویرایش شد.", "success")

        return redirect(url_for("projects.projects"))

    return render_template(
        "admin/project-edit.html",
        project=project,
        images=project.sorted_images,
        data=form_defaults(project)
    )


# =========================================================
# Delete Project
# =========================================================

@projects_bp.route(
    "/<int:project_id>/delete",
    methods=["POST"]
)
@login_required
def delete_project(project_id):

    project = Project.query.get_or_404(project_id)

    for image in project.images:

        image_path = os.path.join(upload_folder(), image.filename)

        if os.path.exists(image_path):
            os.remove(image_path)

    db.session.delete(project)
    db.session.commit()

    flash("پروژه با موفقیت حذف شد.", "success")

    return redirect(url_for("projects.projects"))


# =========================================================
# Delete Single Project Image
# =========================================================

@projects_bp.route(
    "/<int:project_id>/images/<int:image_id>/delete",
    methods=["POST"]
)
@login_required
def delete_image(project_id, image_id):

    project = Project.query.get_or_404(project_id)

    image = ProjectImage.query.filter_by(
        id=image_id,
        project_id=project.id
    ).first_or_404()

    image_path = os.path.join(upload_folder(), image.filename)

    if os.path.exists(image_path):
        os.remove(image_path)

    db.session.delete(image)
    db.session.commit()

    ensure_primary_image(project)

    flash("تصویر با موفقیت حذف شد.", "success")

    return redirect(
        url_for("projects.edit_project", project_id=project.id)
    )


# =========================================================
# Set Primary Image
# =========================================================

@projects_bp.route(
    "/<int:project_id>/images/<int:image_id>/primary",
    methods=["POST"]
)
@login_required
def set_primary_image(project_id, image_id):

    project = Project.query.get_or_404(project_id)

    image = ProjectImage.query.filter_by(
        id=image_id,
        project_id=project.id
    ).first_or_404()

    for item in ProjectImage.query.filter_by(project_id=project.id).all():
        item.is_primary = (item.id == image.id)

    db.session.commit()

    flash("تصویر اصلی (کاور) تغییر کرد.", "success")

    return redirect(
        url_for("projects.edit_project", project_id=project.id)
    )


# =========================================================
# Hide / Publish Project
# =========================================================

@projects_bp.route(
    "/<int:project_id>/toggle-publish",
    methods=["POST"]
)
@login_required
def toggle_publish(project_id):

    project = Project.query.get_or_404(project_id)

    project.is_published = not project.is_published

    db.session.commit()

    flash(
        "پروژه منتشر شد." if project.is_published else "پروژه مخفی شد.",
        "success"
    )

    return redirect(url_for("projects.projects"))
