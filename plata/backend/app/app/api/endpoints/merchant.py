from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List, Optional
from app import crud, schemas

from app.api import deps

router = APIRouter()


@router.get("/")
def get_merchants_and_address(db: Session = Depends(deps.get_db), type_id: Optional[int] = None, cep: Optional[str] = None) -> Any:
    """
    Retrieve merchants.
    """
    if not type_id or not cep:
        return {'merchants': [], 'address': []}

    address = crud.merchant.get_closest_address(db, cep)

    if address == None:
        return {'merchants': [], 'address': []}

    point = crud.merchant.get_osm(address)
    merchants = crud.merchant.get_merchants_by_cep(
        db, type_id, point['lat'], point['lon']
    )

    return {'merchants': merchants, 'address': address}
