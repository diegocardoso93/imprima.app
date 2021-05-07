from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.templates import templates
from app.api import deps

router = APIRouter()


@router.get("/estampa/{rest_of_path:path}")
async def estampa(
    request: Request,
    rest_of_path: str
):
    print(rest_of_path)
    return templates.TemplateResponse('estampa.html', {
        "request": request,
        "url": "https://imprima.app/userspace/estampas/"+rest_of_path+".png"
    })
