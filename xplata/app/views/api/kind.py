from fastapi import APIRouter, Request
from ...models.users import User

router = APIRouter()


@router.get("/api/kind")
async def index(request: Request):
    return await User.query.gino.all()


def init_app(app):
    app.include_router(router)


