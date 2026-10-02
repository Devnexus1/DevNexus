from getpass import getpass

from app import create_app
from app.extensions import db
from app.models import Admin


app = create_app()

with app.app_context():
    username = input("Admin username: ").strip()
    password = getpass("Admin password: ")
    confirm_password = getpass("Confirm password: ")

    if not username:
        print("Username cannot be empty.")
        raise SystemExit(1)

    if not password:
        print("Password cannot be empty.")
        raise SystemExit(1)

    if password != confirm_password:
        print("Passwords do not match.")
        raise SystemExit(1)

    existing_admin = Admin.query.filter_by(username=username).first()

    if existing_admin:
        print("This username already exists.")
        raise SystemExit(1)

    admin = Admin(username=username)
    admin.set_password(password)

    db.session.add(admin)
    db.session.commit()

    print(f"Admin '{username}' created successfully.")