from fastapi import APIRouter

from app.api.endpoints import items, login, users, kinds, images

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(kinds.router, prefix="/kinds", tags=["kinds"])
api_router.include_router(images.router, prefix="/images", tags=["images"])
