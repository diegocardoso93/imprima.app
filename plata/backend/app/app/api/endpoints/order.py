from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel

from typing import Any, List, Dict, Optional
from app import crud, schemas, templates
from app.service import OrderService

from app.api import deps

router = APIRouter()


class InputOrder(BaseModel):
    merchant_id: int
    name: str
    cellphone: str
    street: str
    number: str
    neighborhood: str
    complement: str
    zip: str
    uf: str
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


class InputCreateOrder(BaseModel):
    order: InputOrder
    order_items: List[InputOrderItem]


@router.post("/create")
def create_preference(input: InputCreateOrder, db: Session = Depends(deps.get_db), order_service=Depends(OrderService)):
    """
    Request create order.
    """
    input.order.image = order_service.save_image(input.order.image)
    order = order_service.create_order(db, input.order, input.order_items)

    return {
        "id": order["id"],
        "link": order["link"]
    }


# https://imprima.app/payment/success?collection_id=1235928207&collection_status=approved&payment_id=1235928207&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=2566194208&preference_id=35226241-7594e1db-be22-4fad-ba2c-9286d0f8bd72&site_id=MLB&processing_mode=aggregator&merchant_account_id=null
