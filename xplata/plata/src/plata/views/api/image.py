from fastapi import APIRouter, Request
from ...models.users import User

from ...lib.mage.main import process

router = APIRouter()


@router.get("/api/kind")
async def kind(request: Request):
    process(input_path="static/eumesmo_full.jpg", output_path="static/eumesmo.png", model_name="u2net", preprocessing_method_name="None", postprocessing_method_name="No")
    return true


def init_app(app):
    app.include_router(router)

