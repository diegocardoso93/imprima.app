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
        sa.Column('email', sa.String(255)),
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
        sa.Column('max_distance', sa.Integer,
                  server_default=sa.schema.DefaultClause('20')),
        sa.Column('delivery', sa.Boolean),
        sa.Column('status', sa.Integer, server_default=sa.schema.DefaultClause('1')),
        sa.PrimaryKeyConstraint("id")
    )
    op.execute('CREATE EXTENSION IF NOT EXISTS cube')
    op.execute('CREATE EXTENSION IF NOT EXISTS earthdistance')

    op.bulk_insert(table_merchant, [
        {
            'email': 'diegocardoso.93@hotmail.com',
            'name': 'UzaPrint',
            'phone': '5548996415657',
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
            'email': 'diego.grimera@gmail.com',
            'name': 'HDA Personalizações',
            'phone': '5548991119511',
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
        },
        {
            'email': 'marka@email.com',
            'name': 'Marka Produtos Personalizados',
            'phone': '5548991119511',
            'lat': -29.113707,
            'lon': -51.093622,
            'zip': '95060145',
            'city': 'Caxias do Sul',
            'uf': 'RS',
            'neighborhood': 'Ana Rech',
            'address': 'Av. Rio Branco',
            'address_extra': '',
            'max_distance': 30,
            'delivery': False,
            'created_at': datetime.now()
        },
        {
            'email': '',
            'name': 'Exclusive Personalizados',
            'phone': '5551995093837',
            'lat': -29.7212371,
            'lon': -52.4328594,
            'zip': '96810124',
            'city': 'Santa Cruz do Sul',
            'uf': 'RS',
            'neighborhood': 'Centro',
            'address': 'Rua Venâncio Aires, 1102',
            'address_extra': '',
            'max_distance': 30,
            'delivery': False,
            'created_at': datetime.now()
        }
    ])


def downgrade():
    op.drop_table('merchant')
