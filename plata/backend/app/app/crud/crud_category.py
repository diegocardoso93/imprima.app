from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def seed(self, table_category):
        op.bulk_insert(table_category, [
            {'name': 'Bandeiras'},
            {'name': 'Animais Dóceis'}
        ])


category = CRUDCategory(Category)
