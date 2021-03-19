<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypesAttributesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'P',
            'type_id' => 1
        ]);

        DB::table('types_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'M',
            'type_id' => 1
        ]);

        DB::table('types_attributes')->insert([
            'type' => 'Tamanho',
            'value' => 'G',
            'type_id' => 1
        ]);

        DB::table('types_attributes')->insert([
            'type' => 'Material',
            'value' => 'Cerâmica',
            'type_id' => 2
        ]);

        DB::table('types_attributes')->insert([
            'type' => 'Material',
            'value' => 'Polímero',
            'type_id' => 2
        ]);
    }
}
