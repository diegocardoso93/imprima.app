<?php

namespace App\Http\Controllers;

use App\Services\BannerService;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function banner(Request $request, BannerService $bannerService)
    {
//        $request->get('id');
        return view('banner', $bannerService->get($request->get('url')));
    }

    public function testar()
    {
        return view('testar');
    }
}
