from typing import Optional

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    thumb_url: Optional[str] = None
    status: Optional[int] = 1
    type_id: Optional[int] = None
    category_id: Optional[int] = None
    kind_id: Optional[int] = None


class ProductInDBBase(ProductBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class Product(ProductInDBBase):
    pass
