<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getProductsByKindId($kindId)
    {
        return DB::table('products')
            ->select('products.*')
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

    public function getProduct($id)
    {
        return DB::table('products')
            ->find($id);
    }

    public function getAttributes($merchantId, $typeId)
    {
        return DB::table('merchants_types_attributes as mta')
            ->select(['mta.id', 'merchant_type_attribute_id', 'name', 'value', 'price'])
            ->where('mta.merchant_id', '=', $merchantId)
            ->where('mta.type_id', '=', $typeId)
            ->get();
    }

    public function get($id)
    {
        return DB::table('products')->find($id);
    }

    public function getPriceByMerchantTypeAttribute($merchantTypeAttributeId)
    {
        return DB::table('merchants_types_attributes')->find($merchantTypeAttributeId)->price ?? null;
    }
}
