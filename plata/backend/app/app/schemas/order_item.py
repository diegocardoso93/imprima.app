from typing import Optional

from pydantic import BaseModel


class OrderItemBase(BaseModel):
    name: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[float] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    order_id: Optional[int] = None


class OrderItemInDBBase(OrderItemBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemUpdate(OrderItemBase):
    pass


class OrderItem(OrderItemInDBBase):
    pass
