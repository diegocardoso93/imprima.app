"""create order_item table

Revision ID: 5199d73df58e
Revises: e7f817a3d85a
Create Date: 2021-04-03 22:37:35.464511

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5199d73df58e'
down_revision = 'e7f817a3d85a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'order_item',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('quantity', sa.Integer),
        sa.Column('price', sa.Numeric(8, 2)),
        sa.Column('created_at', sa.DateTime,
                  server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime),
        sa.Column('order_id', sa.Integer, sa.ForeignKey('order.id')),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('order_item')
