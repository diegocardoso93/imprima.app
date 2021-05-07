from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import base64
from uniqid import uniqid
from PIL import Image

from typing import Any, Optional
from app import crud, schemas
from app.api import deps


router = APIRouter()


class InputImageUrl(BaseModel):
    image: str


@router.post("/")
def get_merchants_and_address(
    input: InputImageUrl,
    db: Session = Depends(deps.get_db),
    type_id: Optional[int] = None,
    cep: Optional[str] = None
) -> Any:
    """
    Retrieve merchants.
    """
    if not type_id or not cep:
        return {'merchants': [], 'address': []}

    address = crud.merchant.get_address(cep)

    if address == None:
        return {'merchants': [], 'address': []}

    point = crud.merchant.get_osm(address)
    merchants = crud.merchant.get_merchants_by_cep(
        db, type_id, point['lat'], point['lon']
    )

    base_dir = "app/static/userspace/estampas/"
    file = uniqid()
    file_in = base_dir+file+".png"
    with open(file_in, "wb+") as f:
        f.write(base64.b64decode(input.image.replace(
            "data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")))

    image = Image.open(file_in)
    image.thumbnail((300, 300))
    image.save(base_dir+file+'t.png')

    url = "https://imprima.app/estampa/"+file
    crud.creation_cep.create(db, cep=cep, url=file, type_id=type_id)

    return {'merchants': merchants, 'address': address, 'url': url}
