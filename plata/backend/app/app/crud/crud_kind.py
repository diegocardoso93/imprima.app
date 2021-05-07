from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.kind import Kind
from app.schemas.kind import KindCreate, KindUpdate


class CRUDKind(CRUDBase[Kind, KindCreate, KindUpdate]):
    def import_from_files(self, table_kind):
        for idx, category in enumerate(['bandeiras', 'animais_doceis']):
            (_, _, filenames) = next(walk('app/static/img/produto/'+category))
            for filename in filenames:
                m = re.search(r'(\d+)(.*[^\d+\.png])', filename)
                if m:
                    vName = m.group(2).replace('_', ' ')
                    conn = op.get_bind()
                    res = conn.execute("select * from kind where name = '"+vName+"'")
                    kind = res.fetchone()

                    if kind == None:
                        op.bulk_insert(table_kind, [
                            {'name': vName, 'url': 'https://imprima.app/img/produto/'+category +
                                '/'+filename, 'category_id': idx+1, 'created_at': datetime.now()}
                        ])


kind = CRUDKind(Kind)
