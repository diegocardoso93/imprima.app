<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use MercadoPago\Item;
use MercadoPago\Preference;
use MercadoPago\SDK;
use Illuminate\Http\Request;

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
        $item->picture_url = $product->thumb_url;
        $item->unit_price = $price;
        $item->currency_id = 'BRL';
        $preference->items = [$item];
        $preference->auto_return = 'approved';
        $preference->back_urls = (object) [
            'success' => 'https://imprima.app/pagamento/sucesso',
            'pending' => 'https://imprima.app/pagamento/pendente',
            'failure' => 'https://imprima.app/pagamento/falha'
        ];
        $preference->save();

//dd($preference->getAttributes());

        return response()->json([
            'id' => $preference->id,
            'init_point' => $preference->init_point,
            'sandbox_init_point' => $preference->sandbox_init_point
        ]);
    }

    public function paymentSuccess(Request $request)
    {
        return view('payment_return', ['status' => $request->get('status')]);
    }

    public function paymentPending(Request $request)
    {
        return view('payment_return', ['status' => $request->get('status')]);
    }

    public function paymentFailure(Request $request)
    {
        return view('payment_return', ['status' => 'failure']);
    }
}
