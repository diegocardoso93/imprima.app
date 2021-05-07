from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def create_order(self, db: Session, invoice_id, order, total):
        db_order = Order(
            product_image=order.image,
            product_name=order.product_name,
            name=order.name,
            street=order.street,
            number=order.number,
            neighborhood=order.neighborhood,
            complement=order.complement,
            zip=order.zip,
            city=order.city,
            uf=order.uf,
            cellphone=order.cellphone,
            note=order.note,
            total=total,
            status="created",
            invoice_id=invoice_id,
            created_at=datetime.now(),
            merchant_id=order.merchant_id,
            type_id=order.type_id,
        )

        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        return db_order

    def get_by_invoice_id(self, db: Session, invoice_id):
        return db.query(self.model).filter(self.model.invoice_id == invoice_id).first()


order = CRUDOrder(Order)
