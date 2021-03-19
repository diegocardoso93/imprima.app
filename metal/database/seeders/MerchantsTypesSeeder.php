<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantsTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchants_types')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
        ]);

        DB::table('merchants_types')->insert([
            'merchant_id' => 1,
            'type_id' => 2,
        ]);

        DB::table('merchants_types')->insert([
            'merchant_id' => 2,
            'type_id' => 1,
        ]);

        DB::table('merchants_types')->insert([
            'merchant_id' => 2,
            'type_id' => 2,
        ]);

        DB::table('merchants_types')->insert([
            'merchant_id' => 2,
            'type_id' => 3,
        ]);

        DB::table('merchants_types')->insert([
            'merchant_id' => 2,
            'type_id' => 4,
        ]);
    }
}
