from typing import Optional

from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: Optional[str] = None


class CategoryInDBBase(CategoryBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class Category(CategoryInDBBase):
    pass
