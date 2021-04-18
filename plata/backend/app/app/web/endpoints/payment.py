from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.templates import templates
from app.api import deps
from app.service import CheckoutService

router = APIRouter()


@router.get("/payment/{retstatus}")
async def update_payment(
    request: Request,
    db: Session = Depends(deps.get_db),
    checkout_service=Depends(CheckoutService),
    status: str = '',
    preference_id: str = '',
    payment_id: str = '',
    payment_type: str = ''
):
    """
    Request update payment status.
    """
    order, merchant = checkout_service.update_order(
        db, preference_id, payment_id, payment_type, status)

    return templates.TemplateResponse('payment_return.html', {
        "request": request,
        "status": status,
        "order": order,
        "merchant": merchant
    })
