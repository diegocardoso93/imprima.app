from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("/{id}", response_model=List[schemas.Kind])
def read_kind(id, db: Session = Depends(deps.get_db)) -> Any:
    """
    Retrieve kind.
    """
    print('id', id)
    kinds = crud.kind.get_multi(db)
    return kinds
