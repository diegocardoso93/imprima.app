<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MerchantService;
use App\Services\ProductService;
use Illuminate\Http\Response;

class AttributesController extends Controller
{
    public function index($idProduct, $idMerchant, ProductService $productService, MerchantService $merchantService)
    {
        $product = $productService->getProduct($idProduct);
        $attributes = $productService->getAttributes($idMerchant, $product->type_id);
        $merchant = $merchantService->getMerchant($idMerchant);

        return new Response([
            'product' => $product,
            'attributes' => $attributes,
            'merchant' => $merchant,
        ]);
    }
}
