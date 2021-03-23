<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Client\Request;
use MercadoPago\Item;
use MercadoPago\Preference;
use MercadoPago\SDK;

class CheckoutController extends Controller
{
    public function preference(Request $request, ProductService $productService)
    {
        SDK::setAccessToken('TEST-7463350488822882-101511-f6ea8328b793fa3a80b77e8ccaf1c1d9__LC_LA__-35226241');

        $product = $productService->get($request->get('product_id'));
        $price = $productService->getPriceByMerchantTypeAttribute($request->get('merchant_type_attribute_id'));

        $preference = new Preference();
        $item = new Item();
        $item->title = $product->name;
        $item->quantity = $request->get('quantity') ?? 1;
        $item->unit_price = $price;
        $preference->items = [$item];
        $preference->save();

//dd($preference->getAttributes());

        return response()->json([
            'id' => $preference->id,
            'init_point' => $preference->init_point,
            'sandbox_init_point' => $preference->sandbox_init_point
        ]);
    }
}
