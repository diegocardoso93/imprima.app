from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.templates import templates
from app.api import deps

router = APIRouter()


@router.get("/criador{rest_of_path:path}")
async def criador(
    request: Request,
    rest_of_path: str
):
    return templates.TemplateResponse('criador.html', {
        "request": request
    })
