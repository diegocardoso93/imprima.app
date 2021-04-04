from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory='src/plata/templates')


@router.get("/")
async def homepage(request: Request):
    return templates.TemplateResponse('homepage.html', {'request': request})


def init_app(app):
    app.include_router(router)

