from typing import Optional

from pydantic import BaseModel


class KindBase(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    status: Optional[bool] = True


class KindInDBBase(KindBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class KindCreate(KindBase):
    pass


class KindUpdate(KindBase):
    pass


class Kind(KindInDBBase):
    pass
