from pathlib import Path

from flask import Blueprint, send_from_directory


frontend_bp = Blueprint("frontend", __name__)

# DevNexus/
# ├── index.html
# ├── css/
# ├── js/
# ├── image/
# └── backend/
FRONTEND_ROOT = Path(__file__).resolve().parents[3]


@frontend_bp.route("/")
@frontend_bp.route("/index.html")
def home():
    return send_from_directory(FRONTEND_ROOT, "index.html")


@frontend_bp.route("/project-detail.html")
def project_detail():
    return send_from_directory(FRONTEND_ROOT, "project-detail.html")


@frontend_bp.route("/css/<path:filename>")
def css_files(filename):
    return send_from_directory(FRONTEND_ROOT / "css", filename)


@frontend_bp.route("/js/<path:filename>")
def js_files(filename):
    return send_from_directory(FRONTEND_ROOT / "js", filename)


@frontend_bp.route("/image/<path:filename>")
def image_files(filename):
    return send_from_directory(FRONTEND_ROOT / "image", filename)