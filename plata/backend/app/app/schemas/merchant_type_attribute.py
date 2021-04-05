from typing import Optional

from pydantic import BaseModel


class MerchantTypeAttributeBase(BaseModel):
    name: Optional[str] = None
    value: Optional[str] = None
    price: Optional[str] = None
    active: Optional[bool] = None


class MerchantTypeAttributeInDBBase(MerchantTypeAttributeBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class MerchantTypeAttributeCreate(MerchantTypeAttributeBase):
    pass


class MerchantTypeAttributeUpdate(MerchantTypeAttributeBase):
    pass


class MerchantTypeAttribute(MerchantTypeAttributeInDBBase):
    pass
