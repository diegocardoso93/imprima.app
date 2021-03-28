<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    public static $keys = [
        'times',
        'bandeiras',
        'animais_doceis',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' => 'Times',
        ]);
        DB::table('categories')->insert([
            'name' => 'Bandeiras',
        ]);
        DB::table('categories')->insert([
            'name' => 'Animais Dóceis',
        ]);
        DB::table('categories')->insert([
            'name' => 'Filmes',
        ]);
        DB::table('categories')->insert([
            'name' => 'Animes',
        ]);
        DB::table('categories')->insert([
            'name' => 'Desenhos Animados',
        ]);

//        DB::table('categories')->insert([
//            'name' => 'Animais Selvagens',
//        ]);
//        DB::table('categories')->insert([
//            'name' => 'Pontos Turísticos Regionais',
//        ]);
//        DB::table('categories')->insert([
//            'name' => 'Pontos Turísticos do Brasil',
//        ]);
//        DB::table('categories')->insert([
//            'name' => 'Pontos Turísticos do Mundo',
//        ]);
    }
}
