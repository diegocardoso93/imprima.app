<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CepService;
use Illuminate\Http\Response;

class CepController extends Controller
{
    public function index($number, CepService $cepService)
    {
        $address = $cepService->getClosestAddress($number);
        dd($cepService->getLatLng($address));
//        return new Response(['address' => ]);
    }
}
