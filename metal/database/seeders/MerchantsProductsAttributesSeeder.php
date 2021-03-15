<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantsProductsAttributesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 1,
            'product_attribute_id' => 1,
            'price' => 19.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 1,
            'product_attribute_id' => 3,
            'price' => 25.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 1,
            'product_attribute_id' => 3,
            'price' => 28.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 1,
            'price' => 20.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 2,
            'price' => 30.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 3,
            'price' => 10.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 4,
            'price' => 20.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 5,
            'price' => 30.00
        ]);

    }
}
