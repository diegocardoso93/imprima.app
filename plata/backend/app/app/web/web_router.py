from fastapi import APIRouter

from app.web.endpoints import home, banner, testar, payment

web_router = APIRouter()
web_router.include_router(home.router, tags=["home"])
web_router.include_router(banner.router, tags=["banner"])
web_router.include_router(testar.router, tags=["testar"])
web_router.include_router(payment.router, tags=["payment"])
