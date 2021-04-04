from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("/{id}", response_model=List[schemas.User])
def read_users(id, db: Session = Depends(deps.get_db),) -> Any:
    """
    Retrieve kinds.
    """
    print('id', id)
    users = crud.user.get_multi(db)
    return users

