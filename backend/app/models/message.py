from datetime import datetime

from ..extensions import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(120),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        nullable=False
    )

    phone = db.Column(
        db.String(30),
        nullable=True
    )

    project_type = db.Column(
        db.String(100),
        nullable=True
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="new"
    )

    is_read = db.Column(
        db.Boolean,
        nullable=False,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    ip_address = db.Column(
        db.String(45),
        nullable=True
    )

    def __repr__(self):
        return f"<Message {self.name}>"