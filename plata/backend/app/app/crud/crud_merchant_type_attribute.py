from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from os import walk
import re
from datetime import datetime

from app.crud.base import CRUDBase
from app.models.merchant_type_attribute import MerchantTypeAttribute
from app.schemas.merchant_type_attribute import MerchantTypeAttributeCreate, MerchantTypeAttributeUpdate


class CRUDMerchantTypeAttribute(CRUDBase[MerchantTypeAttribute, MerchantTypeAttributeCreate, MerchantTypeAttributeUpdate]):
    def seed(self, table_merchant_type_attribute):
        for x in [
            {'name': 'Tipo', 'value': 'Masculina',
                'merchant_id': 1, 'type_id': 1, 'price': None},
            {'name': 'Tipo', 'value': 'Feminina',
                'merchant_id': 1, 'type_id': 1, 'price': None},
            {'name': 'Tamanho', 'value': 'P', 'merchant_id': 1, 'type_id': 1,
                'price': 19.00, 'merchant_type_attribute_id': 1},
            {'name': 'Tamanho', 'value': 'M', 'merchant_id': 1, 'type_id': 1,
                'price': 25.00, 'merchant_type_attribute_id': 1},
            {'name': 'Tamanho', 'value': 'G', 'merchant_id': 1, 'type_id': 1,
                'price': 28.00, 'merchant_type_attribute_id': 1},
            {'name': 'Tamanho', 'value': 'GG', 'merchant_id': 1, 'type_id': 1,
                'price': 32.00, 'merchant_type_attribute_id': 1},
            {'name': 'Tamanho', 'value': 'P', 'merchant_id': 1, 'type_id': 1,
                'price': 18.00, 'merchant_type_attribute_id': 2},
            {'name': 'Tamanho', 'value': 'M', 'merchant_id': 1, 'type_id': 1,
                'price': 24.00, 'merchant_type_attribute_id': 2},
            {'name': 'Tamanho', 'value': 'G', 'merchant_id': 1, 'type_id': 1,
                'price': 26.00, 'merchant_type_attribute_id': 2},

            {'name': 'Tipo', 'value': 'Masculina',
                'merchant_id': 2, 'type_id': 1, 'price': None},
            {'name': 'Tamanho', 'value': 'P', 'merchant_id': 2, 'type_id': 1,
                'price': 20.00, 'merchant_type_attribute_id': 10},
            {'name': 'Tamanho', 'value': 'M', 'merchant_id': 2, 'type_id': 1,
                'price': 22.00, 'merchant_type_attribute_id': 10},
            {'name': 'Material', 'value': 'Cerâmica',
                'merchant_id': 2, 'type_id': 2, 'price': 30.00},
            {'name': 'Material', 'value': 'Polímero',
                'merchant_id': 2, 'type_id': 2, 'price': 20.00},

            {'name': 'Tipo', 'value': 'Masculina',
                'merchant_id': 3, 'type_id': 1, 'price': None},
            {'name': 'Tipo', 'value': 'Feminina',
                'merchant_id': 3, 'type_id': 1, 'price': None},
            {'name': 'Tamanho', 'value': 'P', 'merchant_id': 3, 'type_id': 1,
                'price': 19.00, 'merchant_type_attribute_id': 15},
            {'name': 'Tamanho', 'value': 'M', 'merchant_id': 3, 'type_id': 1,
                'price': 25.00, 'merchant_type_attribute_id': 15},
            {'name': 'Tamanho', 'value': 'G', 'merchant_id': 3, 'type_id': 1,
                'price': 28.00, 'merchant_type_attribute_id': 15},
            {'name': 'Tamanho', 'value': 'GG', 'merchant_id': 3, 'type_id': 1,
                'price': 32.00, 'merchant_type_attribute_id': 15},
            {'name': 'Tamanho', 'value': 'P', 'merchant_id': 3, 'type_id': 1,
                'price': 18.00, 'merchant_type_attribute_id': 16},
            {'name': 'Tamanho', 'value': 'M', 'merchant_id': 3, 'type_id': 1,
                'price': 24.00, 'merchant_type_attribute_id': 16},
            {'name': 'Tamanho', 'value': 'G', 'merchant_id': 3, 'type_id': 1,
                'price': 26.00, 'merchant_type_attribute_id': 16},
            {'name': 'Material', 'value': 'Cerâmica',
                'merchant_id': 3, 'type_id': 2, 'price': 30.00},
            {'name': 'Material', 'value': 'Polímero',
                'merchant_id': 3, 'type_id': 2, 'price': 20.00},
            {'name': 'Tamanho', 'value': '40x40cm',
                'merchant_id': 3, 'type_id': 3, 'price': 60.00},


            {'name': '', 'value': '', 'merchant_id': 4, 'type_id': 1, 'price': 0.00},
            {'name': '', 'value': '', 'merchant_id': 4, 'type_id': 2, 'price': 0.00},
            {'name': '', 'value': '', 'merchant_id': 4, 'type_id': 3, 'price': 0.00},
        ]:
            op.bulk_insert(table_merchant_type_attribute, [x])

    def get_attributes(self, db, merchant_id, type_id):
        return db.query(self.model).filter(self.model.merchant_id == merchant_id).filter(self.model.type_id == type_id).all()


merchant_type_attribute = CRUDMerchantTypeAttribute(MerchantTypeAttribute)
