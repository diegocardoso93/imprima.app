"""create category table

Revision ID: a8004ac59977
Revises: 101654423871
Create Date: 2021-04-03 22:35:02.733762

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8004ac59977'
down_revision = '101654423871'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'category',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('category')
