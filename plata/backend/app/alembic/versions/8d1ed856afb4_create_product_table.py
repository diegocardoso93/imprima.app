"""create product table

Revision ID: 8d1ed856afb4
Revises: 6c1769af360c
Create Date: 2021-04-03 22:36:18.141297

"""
from alembic import op
import sqlalchemy as sa
from app.crud import product

# revision identifiers, used by Alembic.
revision = '8d1ed856afb4'
down_revision = '6c1769af360c'
branch_labels = None
depends_on = None


def upgrade():
    table_product = op.create_table(
        'product',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('url', sa.String(255)),
        sa.Column('thumb_url', sa.String(255)),
        sa.Column('type_id', sa.Integer, sa.ForeignKey('type.id')),
        sa.Column('category_id', sa.Integer, sa.ForeignKey('category.id')),
        sa.Column('kind_id', sa.Integer, sa.ForeignKey('kind.id')),
        sa.PrimaryKeyConstraint("id")
    )
    product.import_from_files(table_product)

def downgrade():
    op.drop_table('product')
