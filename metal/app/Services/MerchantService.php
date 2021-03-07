<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class MerchantService
{
    public function getMerchants($lat, $lon, $product = null, $maxDistance = 100)
    {
        return DB::select(DB::raw("
            SELECT
                m.id,
                m.name,
                trim(to_char(point(:lon, :lat) <@> point(longitude, latitude)::point, '990D00')) || 'km' as distance,
            FROM merchants m
            INNER JOIN merchants_products mp on mp.merchant_id = m.id
            INNER JOIN product p on p.id = mp.product_id
            WHERE m.status = :status
            AND (point(:lon, :lat) <@> point(longitude, latitude)) < :maxDistance
            GROUP BY 1
            ORDER BY distance;
        "), [
            'lat' => $lat,
            'lon' => $lon,
            'product' => $product,
            'maxDistance' => $maxDistance,
            'status' => 1
        ]);
    }
}
