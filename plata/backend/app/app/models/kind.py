from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Kind(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)
    status = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("category.id"))
    # category = relationship("Category", back_populates="kinds")
