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
            'product_attribute_id' => 1
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 1,
            'product_attribute_id' => 3
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 1
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 2
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 3
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 4
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 5
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 6,
            'price' => 30.00
        ]);

        DB::table('merchants_products_attributes')->insert([
            'merchant_id' => 2,
            'product_attribute_id' => 7,
            'price' => 19.00
        ]);
    }
}
