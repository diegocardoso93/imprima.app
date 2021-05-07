from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Text, Float, Boolean, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class MerchantTypeAttribute(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    value = Column(Text)
    price = Column(Numeric)
    active = Column(Boolean)
    merchant_id = Column(Integer)
    type_id = Column(Integer)
    merchant_type_attribute_id = Column(Integer)
