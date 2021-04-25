from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.creation_cep import CreationCep
from app.schemas.creation_cep import CreationCepCreate, CreationCepUpdate


class CRUDCreationCep(CRUDBase[CreationCep, CreationCepCreate, CreationCepUpdate]):
    def create(self, db: Session, cep, url, type_id):
        db_creation_cep = CreationCep(
            cep=cep,
            url=url,
            created_at=datetime.now(),
            type_id=type_id,
        )

        db.add(db_creation_cep)
        db.commit()
        db.refresh(db_creation_cep)


creation_cep = CRUDCreationCep(CreationCep)
