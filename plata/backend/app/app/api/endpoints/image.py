from fastapi import APIRouter, Request
from pydantic import BaseModel
import base64
from uniqid import uniqid
from lib.mage.main import process

router = APIRouter()


class InputImage(BaseModel):
    filename: str
    filetype: str
    result: str


@router.post("")
async def remove_bg(inputImage: InputImage):
    base_dir = "app/static/userspace/images/"
    file = uniqid()
    file_in = base_dir+file+".jpg"
    file_out = base_dir+file+".png"
    with open(file_in, "wb+") as f:
        f.write(base64.b64decode(inputImage.result.replace(
            "data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")))

    process(
        input_path=file_in,
        output_path=file_out,
        model_name="u2net",
        preprocessing_method_name="None",
        postprocessing_method_name="No"
    )

    return {
        'image_in': "userspace/images/"+file+".jpg",
        'image_out': "userspace/images/"+file+".png"
    }
