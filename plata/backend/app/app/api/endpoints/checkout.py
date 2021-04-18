from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel

from typing import Any, List, Dict, Optional
from app import crud, schemas, templates
from app.service import CheckoutService

from app.api import deps

router = APIRouter()


class InputOrder(BaseModel):
    merchant_id: int
    name: str
    cellphone: str
    address: str
    note: Optional[str]
    origin: str
    product_name: str
    image: str
    type_id: int


class InputOrderItem(BaseModel):
    detail: str
    id: int
    price: float
    quantity: int


class InputCreatePreference(BaseModel):
    order: InputOrder
    order_items: List[InputOrderItem]


@router.post("/preference")
def create_preference(input: InputCreatePreference, db: Session = Depends(deps.get_db), checkout_service=Depends(CheckoutService)):
    """
    Request checkout preference.
    """
    input.order.image = checkout_service.save_image(input.order.image)
    preference = checkout_service.create_order(db, input.order, input.order_items)

    return {
        "id": preference["id"],
        "init_point": preference["init_point"],
        "sandbox_init_point": preference["sandbox_init_point"]
    }


# https://imprima.app/checkout/payment/success?collection_id=1235928207&collection_status=approved&payment_id=1235928207&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=2566194208&preference_id=35226241-7594e1db-be22-4fad-ba2c-9286d0f8bd72&site_id=MLB&processing_mode=aggregator&merchant_account_id=null
