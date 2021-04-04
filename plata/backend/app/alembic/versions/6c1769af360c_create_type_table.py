"""create type table

Revision ID: 6c1769af360c
Revises: d93661cfa6cc
Create Date: 2021-04-03 22:36:08.949183

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c1769af360c'
down_revision = 'd93661cfa6cc'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'type',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('status', sa.Integer, server_default=sa.schema.DefaultClause('1')),
        sa.Column('order', sa.Integer),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('type')
