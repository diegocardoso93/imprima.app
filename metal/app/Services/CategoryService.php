<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function getCategories()
    {
        return DB::table('categories')->get();
    }

    public function getProducts($categoryId, $typeId)
    {
        return DB::table('products')
            ->where('category_id', $categoryId)
            ->where('type_id', $typeId)
            ->get();
    }
}
