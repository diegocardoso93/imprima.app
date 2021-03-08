<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getProducts()
    {
        return DB::table('products')
            ->orderBy('order')
            ->get();
    }
}
