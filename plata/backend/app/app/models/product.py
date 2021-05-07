from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)
    thumb_url = Column(String)
    type_id = Column(Integer, ForeignKey("type.id"))
    category_id = Column(Integer, ForeignKey("category.id"))
    kind_id = Column(Integer, ForeignKey("kind.id"))
