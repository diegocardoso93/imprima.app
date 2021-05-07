from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.api_router import api_router
from app.web.web_router import web_router
from app.core.config import settings
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        # allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(web_router)

app.mount('/', StaticFiles(directory='app/static', html=True), name="static")
