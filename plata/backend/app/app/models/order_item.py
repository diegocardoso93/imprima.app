from sqlalchemy import Boolean, Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class OrderItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(Integer)
    price = Column(Numeric)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    order_id = Column(Integer, ForeignKey("order.id"))
