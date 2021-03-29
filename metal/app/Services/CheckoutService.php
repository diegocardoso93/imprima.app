<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use MercadoPago\Item;
use MercadoPago\Preference;

class CheckoutService
{
    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function createOrder($order, $orderItem)
    {
        $product = $this->productService->get($orderItem['product_id']);
        $price = $this->productService->getPriceByMerchantTypeAttribute($orderItem['merchant_type_attribute_id']);

        $item = new Item();
        $item->title = $product->name;
        $item->quantity = $orderItem['quantity'] ?? 1;
        $item->picture_url = $product->thumb_url;
        $item->unit_price = $price;
        $item->currency_id = 'BRL';
        $preference = new Preference();
        $preference->items = [$item];
        $preference->auto_return = 'approved';
        $preference->back_urls = (object) [
            'success' => 'https://imprima.app/pagamento/sucesso',
            'pending' => 'https://imprima.app/pagamento/pendente',
            'failure' => 'https://imprima.app/pagamento/falha'
        ];
        $preference->save();

        $this->saveOrder($preference->id, $order, $orderItem, $price);

        return $preference;
    }

    private function saveOrder($preferenceId, $order, $orderItem, $price)
    {
        $sorder = new Order();
        $sorder->name = $order['name'];
        $sorder->cellphone = $order['cellphone'];
        $sorder->address = $order['address'];
        $sorder->note = $order['note'];
        $sorder->total = $orderItem['quantity'] * $price;
        $sorder->merchant_id = $order['merchant_id'];
        $sorder->origin = $order['origin'];
        $sorder->preference_id = $preferenceId;
        $sorder->save();

        $sorderItem = new OrderItem();
        $sorderItem->name = $orderItem['name'];
        $sorderItem->description = $orderItem['description'];
        $sorderItem->quantity = $orderItem['quantity'];
        $sorderItem->price = $price;
        $sorderItem->product_id = $orderItem['product_id'];
        $sorderItem->order_id = $sorder->id;
        $sorderItem->save();

        return $sorder;
    }

    public function updateOrder($preferenceId, $paymentType, $status)
    {
        $order = Order::where('preference_id', '=', $preferenceId)->first();
        $order->payment_type = $paymentType;
        $order->status = $status;
        $order->save();

        $merchant = DB::table('merchants')->find($order->merchant_id);
        return [$order, $merchant];
    }
}
