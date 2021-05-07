from typing import Optional

from pydantic import BaseModel


class TypeBase(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    order: Optional[int] = None
    status: Optional[int] = 1


class TypeInDBBase(TypeBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class TypeCreate(TypeBase):
    pass


class TypeUpdate(TypeBase):
    pass


class Type(TypeInDBBase):
    pass
