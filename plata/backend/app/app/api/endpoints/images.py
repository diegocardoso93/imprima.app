from fastapi import APIRouter, Request
from lib.mage.main import process

router = APIRouter()


@router.get("/generate")
async def generate(request: Request):
    base_dir = "app/static/userspace/images/"
    process(
        input_path=base_dir+"eumesmo.jpg",
        output_path=base_dir+"eumesmo.png",
        model_name="u2net",
        preprocessing_method_name="None",
        postprocessing_method_name="No"
    )
    return True
