<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types')->insert([
            'name' => 'camiseta',
            'order' => 10,
            'created_at' => now(),
        ]);

        DB::table('types')->insert([
            'name' => 'caneca',
            'order' => 20,
            'created_at' => now(),
        ]);

        DB::table('types')->insert([
            'name' => 'quadro',
            'order' => 30,
            'created_at' => now(),
        ]);

        DB::table('types')->insert([
            'name' => 'almofada',
            'order' => 40,
            'created_at' => now(),
        ]);
    }
}