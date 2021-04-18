from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from typing import Any, List

from app import crud, schemas
from app.api import deps

import base64
from uniqid import uniqid
from mercadopago.sdk import SDK


class CheckoutService:
    def save_image(self, base64_file):
        base_dir = "app/static/userspace/orders/"
        file = uniqid()
        file_out = base_dir+file+".png"
        with open(file_out, "wb+") as f:
            f.write(base64.b64decode(base64_file.replace("data:image/png;base64,", "")))

        return "userspace/orders/"+file+".png"

    def create_order(self, db: Session, order, order_items):

        sdk = SDK(
            "TEST-7463350488822882-101511-f6ea8328b793fa3a80b77e8ccaf1c1d9__LC_LA__-35226241")

        print(order, order_items)
        items = []
        total = 0
        for order_item in order_items:
            tmerchant_type_attribute = crud.merchant_type_attribute.get_by_id(
                db, order_item.id)
            item = {
                "title": order.product_name + ' ' + order_item.detail,
                "quantity": order_item.quantity,
                "unit_price": float(tmerchant_type_attribute.price),
                "currency_id": "BRL"
            }
            items.append(item)
            total = total + (order_item.quantity * tmerchant_type_attribute.price)

        preference_data = {
            "items": items,
            "auto_return": "approved",
            "back_urls": {
                "success": "https://imprima.app/checkout/payment/success",
                "pending": "https://imprima.app/checkout/payment/pending",
                "failure": "https://imprima.app/checkout/payment/fail"
            }
        }

        response = sdk.preference().create(preference_data)
        preference = response["response"]
        print(preference)

        porder = crud.order.create_order(db, preference["id"], order, total)

        for order_item in order_items:
            crud.order_item.create_order_item(
                db, porder.id, order_item)

        return preference

    def update_order(self, db, preference_id, payment_id, payment_type, status):
        db_order = crud.order.get_by_preference_id(db, preference_id)
        db_order.payment_id = payment_id
        db_order.payment_type = payment_type
        db_order.status = status
        db.commit()

        merchant = crud.merchant.get_by_id(db, db_order.merchant_id)
        return (db_order, merchant)
