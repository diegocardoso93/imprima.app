"""create cep table

Revision ID: 101654423871
Revises: d4867f3a4c0a
Create Date: 2021-04-03 22:33:35.609324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '101654423871'
down_revision = 'd4867f3a4c0a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'cep',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('zip', sa.String(50), nullable=False, unique=True),
        sa.Column('city', sa.String(255)),
        sa.Column('uf', sa.String(255)),
        sa.Column('neighborhood', sa.String(255)),
        sa.Column('address', sa.String(255)),
        sa.Column('address_extra', sa.String(255)),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('cep')
