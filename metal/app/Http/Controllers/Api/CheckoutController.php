<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CheckoutService;
use MercadoPago\SDK;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    private $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
    }

    public function preference(Request $request, CheckoutService $checkoutService)
    {
        SDK::setAccessToken('TEST-7463350488822882-101511-f6ea8328b793fa3a80b77e8ccaf1c1d9__LC_LA__-35226241');

        $preference = $checkoutService->createOrder($request->get('order'), $request->get('orderItem'));

//dd($preference->getAttributes());

        return response()->json([
            'id' => $preference->id,
            'init_point' => $preference->init_point,
            'sandbox_init_point' => $preference->sandbox_init_point
        ]);
    }

    public function paymentSuccess(Request $request)
    {
        return view('payment_return', $this->paymentReturn($request));
    }

    public function paymentPending(Request $request)
    {
        return view('payment_return', $this->paymentReturn($request));
    }

    public function paymentFailure(Request $request)
    {
        return view('payment_return', $this->paymentReturn($request, 'failure'));
    }

    public function webhookPaymentStatusChanged(Request $request)
    {
        file_put_contents(public_path('/payment'.date('d-m-Yh:i:s').'.txt'), json_encode($request->all()));
    }

    private function paymentReturn($request, $status = null)
    {
        $status = $status ?? $request->get('status');

        [$order, $merchant] = $this->checkoutService->updateOrder(
            $request->get('preference_id'),
            $request->get('payment_type'),
            $status
        );

        return [
            'status' => $status,
            'order' => $order,
            'merchant' => $merchant
        ];
    }
}
