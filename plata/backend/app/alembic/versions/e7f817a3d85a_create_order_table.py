"""create order table

Revision ID: e7f817a3d85a
Revises: 65c0fbcae3ad
Create Date: 2021-04-03 22:37:29.783020

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7f817a3d85a'
down_revision = '65c0fbcae3ad'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'order',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('product_image', sa.String(255)),
        sa.Column('product_name', sa.String(255)),
        sa.Column('name', sa.String(255)),
        sa.Column('street', sa.String(255)),
        sa.Column('number', sa.String(255)),
        sa.Column('neighborhood', sa.String(255)),
        sa.Column('complement', sa.String(255)),
        sa.Column('zip', sa.String(255)),
        sa.Column('city', sa.String(255)),
        sa.Column('uf', sa.String(2)),
        sa.Column('cellphone', sa.String(50)),
        sa.Column('note', sa.Text),
        sa.Column('status', sa.String(50)),
        sa.Column('invoice_id', sa.String(50), unique=True),
        sa.Column('origin', sa.String(50)),
        sa.Column('total', sa.Numeric(8, 2)),
        sa.Column('created_at', sa.DateTime,
                  server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime),
        sa.Column('merchant_id', sa.Integer, sa.ForeignKey('merchant.id')),
        sa.Column('type_id', sa.Integer, sa.ForeignKey('type.id')),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('order')
