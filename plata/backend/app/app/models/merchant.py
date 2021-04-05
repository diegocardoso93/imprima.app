from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Text, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Merchant(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    phone = Column(String)
    zip = Column(String)
    city = Column(String)
    uf = Column(String)
    neighborhood = Column(String)
    address = Column(String)
    address_extra = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    max_distance = Column(Integer)
    delivery = Column(Boolean)
    status = Column(Integer)
