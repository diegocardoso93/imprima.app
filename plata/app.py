from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from lib.mage.main import process

templates = Jinja2Templates(directory='templates')

async def homepage(request):
    return templates.TemplateResponse('homepage.html', {'request': request})

async def banner(request):
    # process(input_path="static/eumesmo_full.jpg", output_path="static/eumesmo.png", model_name="u2net", preprocessing_method_name="None", postprocessing_method_name="No")
    return templates.TemplateResponse('banner.html', {
        'request': request,
        'logourl': '/img/_logobanner/2.png',
        'kind': {'id': 2, 'url': '/img/produto/animais_doceis/00Gatinho.png', 'category_id': 2},
        'type': 2,
        'imprimaId': 123
    })

async def testar(request):
    return templates.TemplateResponse('testar.html', {'request': request, 'palavra': request.query_params.get('palavra', False) or ''})

app = Starlette(debug=True, routes=[
    Route('/', homepage),
    Route('/banner', banner),
    Route('/testar', testar),
    Mount('/', app=StaticFiles(directory='static', html=True), name="static"),
])
