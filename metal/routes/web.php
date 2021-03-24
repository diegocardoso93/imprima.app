<?php

use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [SiteController::class, 'index']);
Route::get('/banner', [SiteController::class, 'banner']);
Route::get('/testar', [SiteController::class, 'testar']);
Route::get('/pagamento/sucesso', [CheckoutController::class, 'paymentSuccess']);
Route::get('/pagamento/pendente', [CheckoutController::class, 'paymentPending']);
Route::get('/pagamento/falha', [CheckoutController::class, 'paymentFailure']);
