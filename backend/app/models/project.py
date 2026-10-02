from datetime import datetime
from ..extensions import db


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)

    title_en = db.Column(db.String(200), nullable=False)
    title_fa = db.Column(db.String(200), nullable=True)

    # توضیح کوتاه: روی کارت پروژه در صفحه‌ی اصلی
    short_description_en = db.Column(db.Text, nullable=True)
    short_description_fa = db.Column(db.Text, nullable=True)

    # توضیح کامل: صفحه‌ی جزئیات پروژه (بین پاراگراف‌ها یک خط خالی)
    description_en = db.Column(db.Text, nullable=False, default="")
    description_fa = db.Column(db.Text, nullable=True)

    technologies = db.Column(db.Text, nullable=True)

    live_demo_url = db.Column(db.String(500), nullable=True)
    github_url = db.Column(db.String(500), nullable=True)

    display_order = db.Column(db.Integer, nullable=False, default=0)

    is_featured = db.Column(db.Boolean, nullable=False, default=False)
    is_published = db.Column(db.Boolean, nullable=False, default=False)

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    images = db.relationship(
        "ProjectImage",
        backref="project",
        lazy=True,
        cascade="all, delete-orphan"
    )

    @property
    def sorted_images(self):
        """تصویر اصلی (کاور) اول، بعد بقیه بر اساس ترتیب."""
        return sorted(
            self.images,
            key=lambda img: (not img.is_primary, img.display_order, img.id)
        )

    @property
    def cover(self):
        images = self.sorted_images
        return images[0] if images else None

    @property
    def technology_list(self):
        raw = (self.technologies or "").replace("،", ",")
        return [item.strip() for item in raw.split(",") if item.strip()]

    def __repr__(self):
        return f"<Project {self.title_en}>"
