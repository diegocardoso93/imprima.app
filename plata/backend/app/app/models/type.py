from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey

from app.db.base_class import Base


class Type(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)
    order = Column(Integer)
    status = Column(Integer)
