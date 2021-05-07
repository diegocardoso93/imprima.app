from sqlalchemy import Boolean, Column, Integer, String, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class CreationCep(Base):
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    cep = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    type_id = Column(Integer, ForeignKey("type.id"))
