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
            'type_id' => 1,
            'name' => 'Tipo',
            'value' => 'Masculina',
            'price' => null
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tipo',
            'value' => 'Feminina',
            'price' => null
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'P',
            'price' => 19.00,
            'merchant_type_attribute_id' => 1
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'M',
            'price' => 25.00,
            'merchant_type_attribute_id' => 1
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'G',
            'price' => 28.00,
            'merchant_type_attribute_id' => 1
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'GG',
            'price' => 32.00,
            'merchant_type_attribute_id' => 1
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'P',
            'price' => 18.00,
            'merchant_type_attribute_id' => 2
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'M',
            'price' => 24.00,
            'merchant_type_attribute_id' => 2
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 1,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'G',
            'price' => 26.00,
            'merchant_type_attribute_id' => 2
        ]);

        $lastId = DB::table('merchants_types_attributes')->insertGetId([
            'merchant_id' => 2,
            'type_id' => 1,
            'name' => 'Tipo',
            'value' => 'Masculina',
            'price' => null
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'P',
            'price' => 20.00,
            'merchant_type_attribute_id' => $lastId
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_id' => 1,
            'name' => 'Tamanho',
            'value' => 'M',
            'price' => 22.00,
            'merchant_type_attribute_id' => $lastId
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_id' => 2,
            'name' => 'Material',
            'value' => 'Cerâmica',
            'price' => 30.00
        ]);

        DB::table('merchants_types_attributes')->insert([
            'merchant_id' => 2,
            'type_id' => 2,
            'name' => 'Material',
            'value' => 'Polímero',
            'price' => 20.00
        ]);
    }
}
