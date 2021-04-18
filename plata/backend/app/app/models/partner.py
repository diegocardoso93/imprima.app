from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Partner(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    site_name = Column(String)
    site_url = Column(String)
    site_category = Column(String)
    zip = Column(String)
    uf = Column(String)
    neighborhood = Column(String)
    address = Column(String)
    address_extra = Column(String)
    lat = Column(Numeric)
    lon = Column(Numeric)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    status = Column(Integer)
