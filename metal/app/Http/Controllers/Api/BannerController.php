<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BannerService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BannerController extends Controller
{
    public function index(Request $request, BannerService $bannerService)
    {
        return new Response($bannerService->get($request->get('url')));
    }
}
