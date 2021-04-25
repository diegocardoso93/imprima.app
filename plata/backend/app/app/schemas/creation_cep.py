from typing import Optional

from pydantic import BaseModel


class CreationCepBase(BaseModel):
    cep: Optional[str] = None
    url: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    type_id: Optional[int] = None


class CreationCepInDBBase(CreationCepBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class CreationCepCreate(CreationCepBase):
    pass


class CreationCepUpdate(CreationCepBase):
    pass


class CreationCep(CreationCepInDBBase):
    pass
