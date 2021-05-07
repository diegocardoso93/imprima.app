from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.templates import templates

router = APIRouter()


@router.get("/testar")
async def testar(request: Request, response_class=HTMLResponse):
    return templates.TemplateResponse(
        'testar.html',
        {'request': request, 'palavra': request.query_params.get('palavra', False) or ''}
    )

