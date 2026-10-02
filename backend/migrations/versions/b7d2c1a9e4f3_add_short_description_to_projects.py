"""add short description columns to projects

Revision ID: b7d2c1a9e4f3
Revises: 42a9eafef949
Create Date: 2026-09-30 20:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7d2c1a9e4f3'
down_revision = '42a9eafef949'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('short_description_en', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('short_description_fa', sa.Text(), nullable=True))


def downgrade():
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.drop_column('short_description_fa')
        batch_op.drop_column('short_description_en')
