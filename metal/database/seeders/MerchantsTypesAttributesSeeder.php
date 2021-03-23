<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantsTypesAttributesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_attribute_id' => 1,
            'price' => 19.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_attribute_id' => 2,
            'price' => 25.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_attribute_id' => 3,
            'price' => 28.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_attribute_id' => 1,
            'price' => 25.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_attribute_id' => 2,
            'price' => 30.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_attribute_id' => 3,
            'price' => 35.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_attribute_id' => 4,
            'price' => 20.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_attribute_id' => 5,
            'price' => 30.00
        ]);

    }
}
