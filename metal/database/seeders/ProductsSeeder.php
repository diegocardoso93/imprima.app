<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'quadro',
            'order' => 10,
            'created_at' => now(),
        ]);

        DB::table('products')->insert([
            'name' => 'camiseta',
            'order' => 20,
            'created_at' => now(),
        ]);

        DB::table('products')->insert([
            'name' => 'caneca',
            'order' => 30,
            'created_at' => now(),
        ]);

        DB::table('products')->insert([
            'name' => 'garrafa squeezy',
            'order' => 40,
            'created_at' => now(),
        ]);

        DB::table('products')->insert([
            'name' => 'boné',
            'order' => 50,
            'created_at' => now(),
        ]);
99
        DB::table('products')->insert([
            'name' => 'almofada',
            'order' => 60,
            'created_at' => now(),
        ]);
    }
}
