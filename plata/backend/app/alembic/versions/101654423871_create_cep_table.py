"""create cep table

Revision ID: 101654423871
Revises: d4867f3a4c0a
Create Date: 2021-04-03 22:33:35.609324

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
from app.utils import list_get_safe_item

# revision identifiers, used by Alembic.
revision = '101654423871'
down_revision = 'd4867f3a4c0a'
branch_labels = None
depends_on = None


def upgrade():
    table_cep = op.create_table(
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

    with open('app/static/files/ceps.txt') as f:
        lines = [line.rstrip() for line in f]

        for line in lines:
            parts = line.split('\t')
            cityUf = parts[1].split('/')
            if cityUf[0]:
                op.bulk_insert(table_cep, [
                    {
                        'zip': parts[0],
                        'city': cityUf[0],
                        'uf': parts[1],
                        'neighborhood': list_get_safe_item(parts, 2),
                        'address': list_get_safe_item(parts, 3),
                        'address_extra': list_get_safe_item(parts, 4),
                        'created_at': datetime.now(),
                    }
                ])


def downgrade():
    op.drop_table('cep')
