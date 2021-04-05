from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("/")
def read_merchant_type_attibute(product_id, merchant_id, db: Session = Depends(deps.get_db)) -> Any:
    """
    Retrieves merchant_type_attribute.
    """
    product = crud.product.get(db, product_id)
    merchant = crud.merchant.get(db, merchant_id)
    attributes = crud.merchant_type_attribute.get_attributes(
        db, merchant_id, product.type_id)

    return {
        'product': product,
        'attributes': attributes,
        'merchant': merchant
    }
