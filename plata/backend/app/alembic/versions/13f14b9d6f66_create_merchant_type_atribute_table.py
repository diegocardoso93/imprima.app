"""create merchant_type_atribute table

Revision ID: 13f14b9d6f66
Revises: ce946f4695cb
Create Date: 2021-04-03 22:36:45.194507

"""
from alembic import op
import sqlalchemy as sa
from app.crud import merchant_type_attribute

# revision identifiers, used by Alembic.
revision = '13f14b9d6f66'
down_revision = 'ce946f4695cb'
branch_labels = None
depends_on = None


def upgrade():
    table_merchant_type_attribute = op.create_table(
        'merchant_type_attribute',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('value', sa.String(255)),
        sa.Column('price', sa.Numeric(8, 2)),
        sa.Column('active', sa.Boolean, server_default=sa.schema.DefaultClause('1')),
        sa.Column('merchant_id', sa.Integer, sa.ForeignKey('merchant.id')),
        sa.Column('type_id', sa.Integer, sa.ForeignKey('type.id')),
        sa.Column('merchant_type_attribute_id', sa.Integer,
                  sa.ForeignKey('merchant_type_attribute.id')),
        sa.PrimaryKeyConstraint("id")
    )

    merchant_type_attribute.seed(table_merchant_type_attribute)


def downgrade():
    op.drop_table('merchant_type_attribute')
