import os

from flask import Blueprint, current_app, jsonify, send_from_directory, abort, url_for

from ..models import Project, Resume


api_bp = Blueprint("api", __name__)


def _image_url(image):
    return url_for("api.project_image", filename=image.filename)


def serialize_project(project):
    images = [
        {
            "url": _image_url(image),
            "alt": image.alt_text or project.title_en,
            "is_primary": bool(image.is_primary),
        }
        for image in project.sorted_images
    ]

    # اگر توضیح کوتاه خالی بود، از ابتدای توضیح کامل استفاده می‌شود
    def fallback_short(short, full):
        if short:
            return short
        if not full:
            return ""
        first = full.strip().split("\n\n")[0].strip()
        return first if len(first) <= 200 else first[:197].rstrip() + "..."

    return {
        "id": project.id,
        "title": {"en": project.title_en, "fa": project.title_fa or project.title_en},
        "short": {
            "en": fallback_short(project.short_description_en, project.description_en),
            "fa": fallback_short(
                project.short_description_fa or project.short_description_en,
                project.description_fa or project.description_en,
            ),
        },
        "description": {
            "en": project.description_en or "",
            "fa": project.description_fa or project.description_en or "",
        },
        "technologies": project.technology_list,
        "live_demo_url": project.live_demo_url,
        "github_url": project.github_url,
        "cover": images[0]["url"] if images else None,
        "images": images,
    }


def _published_projects():
    return Project.query.filter_by(is_published=True).order_by(
        Project.display_order.asc(),
        Project.created_at.desc()
    )


@api_bp.route("/api/projects")
def list_projects():
    projects = [serialize_project(p) for p in _published_projects().all()]

    response = jsonify(projects)
    response.headers["Cache-Control"] = "no-cache"
    return response


@api_bp.route("/api/projects/<int:project_id>")
def get_project(project_id):
    project = _published_projects().filter(Project.id == project_id).first()

    if not project:
        abort(404)

    response = jsonify(serialize_project(project))
    response.headers["Cache-Control"] = "no-cache"
    return response


@api_bp.route("/uploads/projects/<path:filename>")
def project_image(filename):
    folder = os.path.join(current_app.config["UPLOAD_FOLDER"], "projects")
    return send_from_directory(folder, filename, max_age=3600)


@api_bp.route("/api/resume")
def resume_info():
    active = Resume.query.filter_by(is_active=True).first()

    response = jsonify({
        "available": bool(active),
        "url": url_for("api.download_resume") if active else None
    })
    response.headers["Cache-Control"] = "no-cache"
    return response


@api_bp.route("/resume/download")
def download_resume():
    active = Resume.query.filter_by(is_active=True).first()

    if not active:
        abort(404)

    folder = os.path.join(current_app.config["UPLOAD_FOLDER"], "resume")

    return send_from_directory(
        folder,
        active.filename,
        as_attachment=True,
        download_name=active.original_filename
    )
