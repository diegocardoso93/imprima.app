from typing import Optional

from pydantic import BaseModel


class PartnerBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    name: Optional[str] = None
    site_name: Optional[str] = None
    site_url: Optional[str] = None
    site_category: Optional[str] = None
    zip: Optional[str] = None
    uf: Optional[str] = None
    neighborhood: Optional[str] = None
    address: Optional[str] = None
    address_extra: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    status: Optional[int] = None


class PartnerInDBBase(PartnerBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class PartnerCreate(PartnerBase):
    pass


class PartnerUpdate(PartnerBase):
    pass


class Partner(PartnerInDBBase):
    pass
