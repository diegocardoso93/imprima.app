"""create_creation_cep

Revision ID: a4060ec5f560
Revises: 5199d73df58e
Create Date: 2021-04-24 16:40:27.087753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a4060ec5f560'
down_revision = '5199d73df58e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'creation_cep',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('cep', sa.String(50)),
        sa.Column('url', sa.String(255)),
        sa.Column('type_id', sa.Integer, sa.ForeignKey('type.id')),
        sa.Column('created_at', sa.DateTime,
                  server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade():
    op.drop_table('creation_cep')
