from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_image = Column(String)
    product_name = Column(String)
    name = Column(String)
    address = Column(String)
    cellphone = Column(String)
    note = Column(Text)
    status = Column(String)
    payment_type = Column(String)
    preference_id = Column(String)
    payment_id = Column(String)
    origin = Column(String)
    total = Column(Numeric)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    type_id = Column(Integer, ForeignKey("type.id"))
    merchant_id = Column(Integer, ForeignKey("merchant.id"))
    partner_id = Column(Integer, ForeignKey("partner.id"))
