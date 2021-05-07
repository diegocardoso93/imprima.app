from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List, Optional
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Product])
def all_products(
    db: Session = Depends(deps.get_db),
    kind_id: Optional[int] = None,
    category_id: Optional[int] = None,
    type_id: Optional[int] = None
) -> Any:
    """
    Retrieve all products.
    """
    if kind_id:
        products = crud.product.get_by_kind(db, kind_id)
    elif category_id and type_id:
        products = crud.product.get_by_category_and_type(db, category_id, type_id)
    else:
        products = products = crud.product.get_by_kind(db, None)

    return products


@router.get("/{id}", response_model=schemas.Product)
def read_product(id, db: Session = Depends(deps.get_db)) -> Any:
    """
    Retrieve product.
    """
    product = crud.product.get(db, id)
    return product

# /category/{categoryId}/type/{typeId}
