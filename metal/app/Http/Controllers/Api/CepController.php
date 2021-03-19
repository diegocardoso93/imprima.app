<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CepService;
use App\Services\MerchantService;
use Illuminate\Http\Response;

class CepController extends Controller
{
    public function index($productId, $cep, CepService $cepService, MerchantService $merchantService)
    {
        $address = $cepService->getClosestAddress($cep);

        if (!$address) {
            return new Response(['merchants' => [], 'address' => []]);
        }

        $osm = $cepService->getOsm($address);
        return new Response([
            'merchants' => $merchantService->getMerchantsProduct($osm->lat, $osm->lon, $productId),
            'address' => [
                'lat' => $osm->lat,
                'lon' => $osm->lon,
                'uf' => $address->uf,
                'city' => $address->city,
                'zip' => $cep,
                'neighborhood' => $address->neighborhood
            ]
        ]);
    }
}
