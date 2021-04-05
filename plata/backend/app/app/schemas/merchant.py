from typing import Optional

from pydantic import BaseModel


class MerchantBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    phone: Optional[str] = None
    zip: Optional[str] = None
    city: Optional[str] = None
    uf: Optional[str] = None
    neighborhood: Optional[str] = None
    address: Optional[str] = None
    address_extra: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    max_distance: Optional[int] = None
    delivery: Optional[bool] = None
    status: Optional[int] = None


class MerchantInDBBase(MerchantBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class MerchantCreate(MerchantBase):
    pass


class MerchantUpdate(MerchantBase):
    pass


class Merchant(MerchantInDBBase):
    pass
