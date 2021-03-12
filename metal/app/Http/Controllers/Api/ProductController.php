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
                $product->image = '/alo/img/' . $product->name . '.png';
                return $product;
            });

        return new Response($products);
    }
}
