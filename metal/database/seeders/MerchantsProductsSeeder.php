<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantsProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchants_products')->insert([
            'merchant_id' => 1,
            'product_id' => 1,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 1,
            'product_id' => 2,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 1,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 2,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 3,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 4,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 5,
        ]);

        DB::table('merchants_products')->insert([
            'merchant_id' => 2,
            'product_id' => 6,
        ]);
    }
}
