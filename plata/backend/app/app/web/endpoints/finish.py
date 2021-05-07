from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.templates import templates
from app.api import deps
from app.service import OrderService

router = APIRouter()


@router.get("/finish")
async def finish(
    request: Request,
    db: Session = Depends(deps.get_db),
    order_service=Depends(OrderService),
    order_id: str = ''
):
    """
    Request finish order.
    """
    # order, merchant = checkout_service.update_order(
    #     db, preference_id, payment_id, payment_type, status)

    return templates.TemplateResponse('payment_return.html', {
        "request": request,
        # "status": status,
        # "order": order,
        # "merchant": merchant
    })
