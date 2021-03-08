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
        [$lat, $lon] = $cepService->getLatLon($address);

        return new Response($merchantService->getMerchantsProduct($lat, $lon, $productId));
    }
}
