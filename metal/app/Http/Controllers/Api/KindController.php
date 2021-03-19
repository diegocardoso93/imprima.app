<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Response;

class KindController extends Controller
{
    public function index($id, ProductService $productService)
    {
        $products = $productService->getProductsByKindId($id);

        return new Response($products);
    }
}
