"""create kind table

Revision ID: d93661cfa6cc
Revises: a8004ac59977
Create Date: 2021-04-03 22:35:26.019049

"""
from alembic import op
import sqlalchemy as sa

from app.crud import kind

# revision identifiers, used by Alembic.
revision = 'd93661cfa6cc'
down_revision = 'a8004ac59977'
branch_labels = None
depends_on = None


def upgrade():
    table_kind = op.create_table(
        'kind',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255)),
        sa.Column('url', sa.String(255)),
        sa.Column('status', sa.Integer, server_default=sa.schema.DefaultClause('1')),
        sa.Column('category_id', sa.Integer, sa.ForeignKey('category.id')),
        sa.PrimaryKeyConstraint("id")
    )

    kind.import_from_files(table_kind)

def downgrade():
    op.drop_table('kind')
