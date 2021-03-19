<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class MerchantService
{
    public function getMerchantsProduct($lat, $lon, $productId)
    {
        return DB::select(DB::raw("
            SELECT
                m.id,
                m.name,
                trim(to_char(point(:lon, :lat) <@> point(lon, lat)::point, '990D00')) || 'km' as distance,
                (case m.delivery when true then 'grátis' else 'retirar' end) delivery,
                m.city,
                m.uf,
                min(mta.price) price
            FROM products p
            INNER JOIN merchants_types mt ON mt.type_id = p.type_id
            INNER JOIN merchants m ON m.id = mt.merchant_id
            INNER JOIN types_attributes ta ON ta.type_id = mt.type_id
            INNER JOIN merchants_types_attributes mta ON mta.type_attribute_id = ta.id AND mta.merchant_id = m.id
            WHERE p.id = :productId
                AND (point(:lon, :lat) <@> point(lon, lat)) < m.max_distance
                AND m.status = :status
            GROUP BY 1
            ORDER BY distance;
        "), [
            'lat' => $lat,
            'lon' => $lon,
            'productId' => $productId,
            'status' => 1
        ]);
    }
}
