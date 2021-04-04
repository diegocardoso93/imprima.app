from fastapi import APIRouter, Request
from app.templates import templates
from lib.mage.main import process

router = APIRouter()


@router.get("/")
async def homepage(request: Request):
    return templates.TemplateResponse('homepage.html', {'request': request})

