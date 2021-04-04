from fastapi import APIRouter

from app.web.endpoints import home, banner, testar

web_router = APIRouter()
web_router.include_router(home.router, tags=["home"])
web_router.include_router(banner.router, tags=["banner"])
web_router.include_router(testar.router, tags=["testar"])
