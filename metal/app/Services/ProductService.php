<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getProductsByKindId($kindId)
    {
        return DB::table('products')
            ->join('types', 'types.id', '=', 'products.type_id')
            ->where('products.kind_id', '=', $kindId)
            ->orderBy('types.order')
            ->get();
    }

    public function getProducts()
    {
        return DB::table('products')
            ->orderBy('types.order')
            ->get();
    }
}
