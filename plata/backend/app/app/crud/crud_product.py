from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

types = {
    '1': 'Camiseta',
    '2': 'Caneca',
    '3': 'Almofada',
    '4': 'Quadro'
}


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def import_from_files(self, table_product):
        for idx, category in enumerate(['bandeiras', 'animais_doceis']):
            (_, _, filenames) = next(walk('app/static/img/produto/'+category))
            for filename in filenames:
                m = re.search(r'(\d+)([^\d+].*)(\d+)', filename)
                if m:
                    print(m, m.group(1), m.group(1), m.group(2), m.group(3))
                    vName = m.group(2).replace('_', ' ')
                    ttype = m.group(3)

                    conn = op.get_bind()
                    res = conn.execute("select id from kind where name = '"+vName+"'")
                    kind_id = res.scalar()

                    res = conn.execute(
                        "select 1 from product where name = '"+types[ttype] + ' ' + vName+"'")
                    exists = res.scalar()

                    if kind_id and not exists:
                        op.bulk_insert(table_product, [
                            {
                                'kind_id': kind_id,
                                'category_id': idx+1,
                                'type_id': ttype,
                                'name': types[ttype] + ' ' + vName,
                                'url': 'https://imprima.app/img/produto/'+category+'/'+filename,
                                'thumb_url': 'https://imprima.app/img/produto/'+category+'/thumb/'+filename
                            }
                        ])

    def get_by_kind(self, db: Session, kind_id: int = 0):
        return db.query(self.model).filter(self.model.kind_id == kind_id).all()

    def get_by_category_and_type(self, db: Session, category_id: int, type_id: int):
        return db.query(self.model).filter(self.model.category_id == category_id).filter(self.model.type_id == type_id).all()


product = CRUDProduct(Product)
