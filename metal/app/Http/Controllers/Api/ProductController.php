<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index(ProductService $productService)
    {
        $products = $productService->getProducts()
            ->map(function ($product) {
                $product->image = '/img/' . $product->name . '.png';
                return $product;
            });

        return new Response($products);
    }

    public function get($id, ProductService $productService)
    {
//        dd($productService->getProduct($id));
        return response()->json($productService->getProduct($id));
    }
}
