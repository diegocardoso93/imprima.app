from typing import Optional

from pydantic import BaseModel


class OrderBase(BaseModel):
    product_image: Optional[str] = None
    product_name: Optional[str] = None
    name: Optional[str] = None
    address: Optional[str] = None
    cellphone: Optional[str] = None
    note: Optional[str] = None
    status: Optional[str] = None
    payment_type: Optional[str] = None
    preference_id: Optional[str] = None
    payment_id: Optional[str] = None
    origin: Optional[str] = None
    total: Optional[float] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    type_id: Optional[int] = None
    merchant_id: Optional[int] = None
    partner_id: Optional[int] = None


class OrderInDBBase(OrderBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class OrderCreate(OrderBase):
    pass


class OrderUpdate(OrderBase):
    pass


class Order(OrderInDBBase):
    pass
