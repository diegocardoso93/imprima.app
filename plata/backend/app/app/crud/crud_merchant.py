from typing import Any, Dict, Optional, Union
from alembic import op
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
import requests
import json

from app.crud.base import CRUDBase
from app.models.merchant import Merchant
from app.schemas.merchant import MerchantCreate, MerchantUpdate


class CRUDMerchant(CRUDBase[Merchant, MerchantCreate, MerchantUpdate]):
    def get_closest_address(self, db: Session, cep: str) -> Merchant:
        return db.execute("""SELECT * FROM
        (
            (SELECT * FROM cep WHERE zip::int >= cast(:cep as integer) ORDER BY zip LIMIT 1)
                UNION ALL
            (SELECT * FROM cep WHERE zip::int < cast(:cep as integer) ORDER BY zip DESC LIMIT 1)
        ) as foo
        ORDER BY abs(cast(:cep as integer) - zip::int) LIMIT 1""", {'cep': cep}).fetchone()

    def get_address(self, cep: str):
        res = requests.get(f"https://viacep.com.br/ws/{cep}/json")
        if res.status_code == 200:
            return json.loads(res.content.decode('utf-8'))
        return None

    def get_osm(self, address: Merchant):
        print('address', address)
        res = requests.get(
            f"https://nominatim.openstreetmap.org/search.php?street={address['logradouro']}&city={address['bairro']}&county={address['localidade']}&state={address['uf']}&country=Brazil&countrycodes=br&format=jsonv2"
        )
        content = json.loads(res.content.decode('utf-8'))
        if res.status_code == 200 and len(content):
            obj = content[0]
            return {'lat': obj['lat'], 'lon': obj['lon']}
        else:
            res = requests.get(
                f"https://nominatim.openstreetmap.org/search.php?street=&city={address['bairro']}&county={address['localidade']}&state={address['uf']}&country=Brazil&countrycodes=br&format=jsonv2"
            )
            content = json.loads(res.content.decode('utf-8'))
            if res.status_code == 200 and len(content):
                obj = content[0]
                return {'lat': obj['lat'], 'lon': obj['lon']}

        return {'lat': None, 'lon': None}

    def get_merchants_by_cep(self, db: Session, type_id: int, lat: float, lon: float):
        return db.execute(
            """SELECT
                m.id,
                m.name,
                trim(to_char(point(:lon, :lat) <@> point(lon, lat)::point, '990D00')) || 'km' as distance,
                (case m.delivery when true then 'grátis' else 'retirar' end) delivery,
                m.city,
                m.uf,
                min(mta.price) price,
                m.phone
            FROM merchant_type_attribute mta
            INNER JOIN merchant m ON mta.merchant_id = m.id
            WHERE mta.type_id = :typeId
                AND (point(:lon, :lat) <@> point(lon, lat)) < m.max_distance
                AND m.status = :status
            GROUP BY 1
            ORDER BY distance
            """, {
                "lat": lat,
                "lon": lon,
                "typeId": type_id,
                "status": 1
            }
        ).fetchall()


merchant = CRUDMerchant(Merchant)
