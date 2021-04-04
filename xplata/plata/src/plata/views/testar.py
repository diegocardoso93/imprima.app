from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory='src/plata/templates')
router = APIRouter()

@router.get("/testar")
async def testar(request: Request, response_class=HTMLResponse):
    return templates.TemplateResponse(
        'testar.html',
        {'request': request, 'palavra': request.query_params.get('palavra', False) or ''}
    )

def init_app(app):
    app.include_router(router)
