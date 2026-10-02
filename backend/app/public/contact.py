import re
import time
from collections import defaultdict, deque

from flask import Blueprint, request, jsonify

from ..extensions import db
from ..models import Message
from ..services.notify import notify_new_message


contact_bp = Blueprint("contact", __name__)


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# محدودیت ساده‌ی ارسال: حداکثر ۵ پیام از هر IP در ۱۰ دقیقه (در حافظه)
RATE_LIMIT = 5
RATE_WINDOW = 10 * 60
_recent = defaultdict(deque)


def _too_many(ip):
    now = time.time()
    hits = _recent[ip]

    while hits and now - hits[0] > RATE_WINDOW:
        hits.popleft()

    if len(hits) >= RATE_LIMIT:
        return True

    hits.append(now)
    return False


def _fail(message, status=400):
    return jsonify({"success": False, "message": message}), status


@contact_bp.route("/api/contact", methods=["POST"])
def contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    project_type = request.form.get("project_type", "").strip()
    message_text = request.form.get("message", "").strip()
    website = request.form.get("website", "").strip()

    # Spam trap: کاربر واقعی این فیلد مخفی را پر نمی‌کند
    if website:
        return jsonify({"success": True, "message": "Message received."}), 200

    if not name:
        return _fail("Name is required.")

    if not email or not EMAIL_RE.match(email):
        return _fail("A valid email is required.")

    if not phone:
        return _fail("Phone is required.")

    if not message_text:
        return _fail("Message is required.")

    if len(name) > 120 or len(email) > 255 or len(phone) > 30 or len(message_text) > 5000:
        return _fail("One of the fields is too long.")

    if _too_many(request.remote_addr):
        return _fail("Too many messages. Please try again later.", 429)

    new_message = Message(
        name=name,
        email=email,
        phone=phone,
        project_type=project_type[:100] or None,
        message=message_text,
        status="new",
        is_read=False,
        ip_address=request.remote_addr
    )

    try:
        db.session.add(new_message)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return _fail("Could not save your message.", 500)

    # اطلاع‌رسانی (ایمیل / پیامک / تلگرام) در پس‌زمینه؛ خطایش جلوی ثبت پیام را نمی‌گیرد
    try:
        notify_new_message(new_message)
    except Exception:
        pass

    return jsonify({"success": True, "message": "Message sent successfully."}), 201
