"""create partner table

Revision ID: 65c0fbcae3ad
Revises: 13f14b9d6f66
Create Date: 2021-04-03 22:37:23.429444

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65c0fbcae3ad'
down_revision = '13f14b9d6f66'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'partner',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('description', sa.Text),
        sa.Column('site_name', sa.String(255)),
        sa.Column('site_url', sa.String(255)),
        sa.Column('site_category', sa.String(255)),
        sa.Column('zip', sa.String(255)),
        sa.Column('city', sa.String(255)),
        sa.Column('uf', sa.String(2)),
        sa.Column('neighborhood', sa.String(255)),
        sa.Column('address', sa.String(255)),
        sa.Column('address_extra', sa.String(255)),
        sa.Column('lat', sa.Float),
        sa.Column('lon', sa.Float),
        sa.Column('status', sa.Integer, server_default=sa.schema.DefaultClause('1')),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('partner')
