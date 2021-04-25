from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel

from typing import Any, List, Optional, Dict
from app import crud, schemas
from app.api import deps
from app.service import StarkbankService

router = APIRouter()


class InputEvent(BaseModel):
    event: Dict


@router.get("/invoice")
def stark_create_invoice(db: Session = Depends(deps.get_db), starkbank_service=Depends(StarkbankService)):
    starkbank_service.create_invoice()
    pass


@router.get("/transfer")
def stark_transfer():
    pass


@router.post("/webhook")
def stark_webhook(inputEvent: InputEvent):
    print('from webhook')
    print(inputEvent)
    log = inputEvent.log
    order_service.update(id=log.id, status=log.status)
