<?php

use App\Http\Controllers\Api\CepController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BannerController;
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
Route::get('cep/{productId}/{cep}', [CepController::class, 'index']);
Route::options('banner', [BannerController::class, 'index']);

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


//01002900	São Paulo/SP	Centro	Viaduto do Chá, 15 	 Prefeitura do Município de São Paulo
