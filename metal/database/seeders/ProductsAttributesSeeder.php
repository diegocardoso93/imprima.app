<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsAttributesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'P',
            'product_id' => 2
        ]);

        DB::table('products_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'M',
            'product_id' => 2
        ]);

        DB::table('products_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'G',
            'product_id' => 2
        ]);

        DB::table('products_attributes')->insert([
            'type' => 'Material',
            'value' => 'Cerâmica',
            'product_id' => 3
        ]);

        DB::table('products_attributes')->insert([
            'type' => 'Material',
            'value' => 'Polímero',
            'product_id' => 3
        ]);
    }
}
