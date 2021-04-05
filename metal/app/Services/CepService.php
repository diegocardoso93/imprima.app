<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class CepService
{
    public function getClosestAddress($cep)
    {
        return DB::selectOne(DB::raw("
            SELECT * FROM
            (
                (SELECT * FROM ceps WHERE zip::int >= :cep::int ORDER BY zip LIMIT 1)
                    UNION ALL
                (SELECT * FROM ceps WHERE zip::int < :cep::int  ORDER BY zip DESC LIMIT 1)
            ) as foo
            ORDER BY abs(:cep::int - zip::int) LIMIT 1
        "), [
            'cep' => $cep
        ]);
    }

    public function getOsm($address)
    {
        $res = (new Client(['verify' => base_path() . '/cacert.pem']))
            ->get(
                'https://nominatim.openstreetmap.org/search.php?city='.$address->neighborhood.'&county='.$address->city.'&state='.$address->uf.'&country=Brazil&polygon_geojson=1&countrycodes=br&format=jsonv2'
            );
        if ($res->getStatusCode() == 200) {
            $osm = json_decode($res->getBody());
            $osm = $osm[0] ?? null;
        }
        return $osm ?? (object)['lat' => null, 'lon' => null];
    }

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
            INNER JOIN merchants_types_attributes mta ON mta.type_id = p.type_id
            INNER JOIN merchants m ON mta.merchant_id = m.id
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
