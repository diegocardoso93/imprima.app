from fastapi import APIRouter

from app.api.endpoints import item, login, user, kind, image, product, category, merchant, merchant_type_attribute, order

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(item.router, prefix="/item", tags=["item"])
api_router.include_router(kind.router, prefix="/kind", tags=["kind"])
api_router.include_router(image.router, prefix="/image", tags=["image"])
api_router.include_router(product.router, prefix="/product", tags=["product"])
api_router.include_router(category.router, prefix="/category", tags=["category"])
api_router.include_router(merchant.router, prefix="/merchant", tags=["merchant"])
api_router.include_router(merchant_type_attribute.router,
                          prefix="/merchant_type_attribute", tags=["merchant_type_attribute"])
api_router.include_router(order.router, prefix="/order", tags=["order"])
