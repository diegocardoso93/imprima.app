from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.type import Type
from app.schemas.type import TypeCreate, TypeUpdate


class CRUDType(CRUDBase[Type, TypeCreate, TypeUpdate]):
    def seed(self, table_type):
        op.bulk_insert(table_type, [
            {
                'name': 'camiseta',
                'order': 10,
                'created_at': datetime.now()
            },
            {
                'name': 'caneca',
                'order': 20,
                'created_at': datetime.now()
            },
            {
                'name': 'quadro',
                'order': 30,
                'created_at': datetime.now()
            },
            # {
            #     'name': 'almofada',
            #     'order': 40,
            #     'created_at': datetime.now()
            # }
        ])


ttype = CRUDType(Type)
