from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("", response_model=List[schemas.Category])
def read_categories(db: Session = Depends(deps.get_db)) -> Any:
    """
    Retrieve categories.
    """
    categorys = crud.category.get_multi(db)
    return categorys
