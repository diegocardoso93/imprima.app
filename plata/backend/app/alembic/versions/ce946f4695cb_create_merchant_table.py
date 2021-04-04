"""create merchant table

Revision ID: ce946f4695cb
Revises: 8d1ed856afb4
Create Date: 2021-04-03 22:36:22.480529

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime

# revision identifiers, used by Alembic.
revision = 'ce946f4695cb'
down_revision = '8d1ed856afb4'
branch_labels = None
depends_on = None


def upgrade():
    table_merchant = op.create_table(
        'merchant',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('description', sa.Text),
        sa.Column('phone', sa.String(255)),
        sa.Column('zip', sa.String(255)),
        sa.Column('city', sa.String(255)),
        sa.Column('uf', sa.String(2)),
        sa.Column('neighborhood', sa.String(255)),
        sa.Column('address', sa.String(255)),
        sa.Column('address_extra', sa.String(255)),
        sa.Column('lat', sa.Float),
        sa.Column('lon', sa.Float),
        sa.Column('max_distance', sa.Integer, server_default=sa.schema.DefaultClause('20')),
        sa.Column('delivery', sa.Boolean),
        sa.Column('status', sa.Integer, server_default=sa.schema.DefaultClause('1')),
        sa.PrimaryKeyConstraint("id")
    )
    op.execute('CREATE EXTENSION IF NOT EXISTS cube')
    op.execute('CREATE EXTENSION IF NOT EXISTS earthdistance')

    op.bulk_insert(table_merchant, [
        {
            'name': 'UzaPrint',
            'phone': '48996415657',
            'lat': -28.4812066,
            'lon': -49.0064517,
            'zip': '88701105',
            'city': 'Tubarão',
            'uf': 'SC',
            'neighborhood': 'Centro',
            'address': 'Av. Marcolino Martins Cabral, 1315',
            'address_extra': 'Praça Shopping',
            'max_distance': 30,
            'delivery': True,
            'created_at': datetime.now()
        },
        {
            'name': 'HDA Personalizações',
            'phone': '48991119511',
            'lat': -28.4734123,
            'lon': -49.0130107,
            'zip': '88704400',
            'city': 'Tubarão',
            'uf': 'SC',
            'neighborhood': 'Humaitá',
            'address': 'R. Roberto Zumblick, 822',
            'address_extra': 'Sala 02',
            'max_distance': 30,
            'delivery': False,
            'created_at': datetime.now()
        }
    ])


def downgrade():
    op.drop_table('merchant')
