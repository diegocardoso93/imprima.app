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
        return new Response($categoryService->getProducts($categoryId, $typeId));
    }
}
