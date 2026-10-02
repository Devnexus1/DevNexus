from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    flash
)

from flask_login import login_required

from ..extensions import db
from ..models import Message


messages_bp = Blueprint(
    "messages",
    __name__,
    url_prefix="/admin/messages"
)


# =========================================================
# Messages List
# =========================================================

@messages_bp.route("/")
@login_required
def messages():

    current_filter = request.args.get("filter", "all")

    query = Message.query

    if current_filter == "unread":
        query = query.filter_by(is_read=False)
    elif current_filter == "replied":
        query = query.filter_by(status="replied")
    elif current_filter == "archived":
        query = query.filter_by(status="archived")
    else:
        current_filter = "all"
        query = query.filter(Message.status != "archived")

    messages = query.order_by(
        Message.created_at.desc()
    ).all()

    return render_template(
        "admin/messages.html",
        messages=messages,
        current_filter=current_filter
    )


# =========================================================
# Message Detail
# =========================================================

@messages_bp.route("/<int:message_id>")
@login_required
def message_detail(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    # Automatically mark message as read
    if not message.is_read:

        message.is_read = True

        if message.status == "new":
            message.status = "read"

        db.session.commit()

    return render_template(
        "admin/message-detail.html",
        message=message
    )


# =========================================================
# Mark As Read
# =========================================================

@messages_bp.route(
    "/<int:message_id>/read",
    methods=["POST"]
)
@login_required
def mark_read(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    message.is_read = True

    if message.status == "new":
        message.status = "read"

    db.session.commit()

    flash(
        "پیام به عنوان خوانده‌شده علامت خورد.",
        "success"
    )

    return redirect(
        url_for("messages.messages")
    )


# =========================================================
# Mark As Unread
# =========================================================

@messages_bp.route(
    "/<int:message_id>/unread",
    methods=["POST"]
)
@login_required
def mark_unread(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    message.is_read = False

    if message.status == "read":
        message.status = "new"

    db.session.commit()

    flash(
        "پیام به عنوان خوانده‌نشده علامت خورد.",
        "success"
    )

    return redirect(
        url_for("messages.messages")
    )


# =========================================================
# Mark As Replied
# =========================================================

@messages_bp.route(
    "/<int:message_id>/replied",
    methods=["POST"]
)
@login_required
def mark_replied(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    message.is_read = True
    message.status = "replied"

    db.session.commit()

    flash(
        "وضعیت پیام به پاسخ‌داده‌شده تغییر کرد.",
        "success"
    )

    return redirect(
        url_for("messages.messages")
    )


# =========================================================
# Archive Message
# =========================================================

@messages_bp.route(
    "/<int:message_id>/archive",
    methods=["POST"]
)
@login_required
def archive_message(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    message.is_read = True
    message.status = "archived"

    db.session.commit()

    flash(
        "پیام آرشیو شد.",
        "success"
    )

    return redirect(
        url_for("messages.messages")
    )


# =========================================================
# Delete Message
# =========================================================

@messages_bp.route(
    "/<int:message_id>/delete",
    methods=["POST"]
)
@login_required
def delete_message(message_id):

    message = Message.query.get_or_404(
        message_id
    )

    db.session.delete(
        message
    )

    db.session.commit()

    flash(
        "پیام با موفقیت حذف شد.",
        "success"
    )

    return redirect(
        url_for("messages.messages")
    )