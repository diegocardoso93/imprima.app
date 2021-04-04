from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory='src/plata/templates')
router = APIRouter()

@router.get("/banner")
async def banner(request: Request, response_class=HTMLResponse):
    return templates.TemplateResponse('banner.html', {
        'request': request,
        'logourl': '/img/_logobanner/2.png',
        'kind': {'id': 2, 'url': '/img/produto/animais_doceis/00Gatinho.png', 'category_id': 2},
        'type': 2,
        'imprimaId': 123
    })

def init_app(app):
    app.include_router(router)
