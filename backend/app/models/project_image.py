from datetime import datetime
from ..extensions import db


class ProjectImage(db.Model):
    __tablename__ = "project_images"

    id = db.Column(db.Integer, primary_key=True)

    project_id = db.Column(
        db.Integer,
        db.ForeignKey("projects.id"),
        nullable=False
    )

    filename = db.Column(db.String(255), nullable=False)
    alt_text = db.Column(db.String(255), nullable=True)

    display_order = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    is_primary = db.Column(
        db.Boolean,
        nullable=False,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<ProjectImage {self.filename}>"