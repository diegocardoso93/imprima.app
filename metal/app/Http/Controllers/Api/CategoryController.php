<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    public function index(CategoryService $categoryService)
    {
        return new Response($categoryService->getCategories());
    }

    public function products($categoryId, $typeId, CategoryService $categoryService)
    {
        $products = $categoryService->getProducts($categoryId, $typeId);
        $arr = [];
        foreach ($products as $product) {
            $arr[] = $product;
        }
        return new Response($arr);
    }
}
