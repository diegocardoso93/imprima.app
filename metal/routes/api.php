<?php

use App\Http\Controllers\Api\AttributesController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\CepController;
use App\Http\Controllers\Api\KindController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('produto', [ProductController::class, 'index']);
Route::get('produto/{id}', [ProductController::class, 'get']);
Route::get('attributes/{productId}/{merchantId}', [AttributesController::class, 'index']);
Route::get('kind/{id}', [KindController::class, 'index']);
Route::get('category', [CategoryController::class, 'index']);
Route::get('category/{categoryId}/type/{typeId}', [CategoryController::class, 'products']);
Route::get('cep/{productId}/{cep}', [CepController::class, 'index']);
Route::options('banner', [BannerController::class, 'index']);
Route::post('checkout/preference', [CheckoutController::class, 'preference']);


//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


//01002900	São Paulo/SP	Centro	Viaduto do Chá, 15 	 Prefeitura do Município de São Paulo
