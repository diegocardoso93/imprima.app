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
}
