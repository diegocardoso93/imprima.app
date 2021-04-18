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
    def create_order(self, db: Session, preference_id, order, total):
        db_order = Order(
            product_image=order.image,
            product_name=order.product_name,
            name=order.name,
            address=order.address,
            cellphone=order.cellphone,
            note=order.note,
            total=total,
            status="created",
            preference_id=preference_id,
            created_at=datetime.now(),
            merchant_id=order.merchant_id,
            type_id=order.type_id,
            partner_id=None
            # partner_id=1  # partner_id por parâmetro ou distância
            # partner_id=order.partner_id,
        )

        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        return db_order

    def get_by_preference_id(self, db: Session, preference_id):
        return db.query(self.model).filter(self.model.preference_id == preference_id).first()


order = CRUDOrder(Order)
