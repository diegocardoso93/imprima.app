from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.order_item import OrderItem
from app.schemas.order_item import OrderItemCreate, OrderItemUpdate


class CRUDOrderItem(CRUDBase[OrderItem, OrderItemCreate, OrderItemUpdate]):
    def create_order_item(self, db: Session, order_id, order_item):
        db_order_item = OrderItem(
            name=order_item.detail,
            quantity=order_item.quantity,
            price=order_item.price,
            created_at=datetime.now(),
            order_id=order_id
        )

        db.add(db_order_item)
        db.commit()
        db.refresh(db_order_item)
        return db_order_item


order_item = CRUDOrderItem(OrderItem)
