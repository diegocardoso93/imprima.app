<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KindsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('kinds')->insert([
            'name' => 'grêmio',
            'url' => 'https://imprima.app/img/times/00gremio.png',
            'category_id' => 2, //times
            'created_at' => now(),
        ]);

        DB::table('kinds')->insert([
            'name' => 'inter',
            'url' => 'https://imprima.app/img/times/00inter.png',
            'category_id' => 2, //times
            'created_at' => now(),
        ]);

        DB::table('kinds')->insert([
            'name' => 'gato',
            'url' => 'https://imprima.app/img/animais/00gato.png',
            'category_id' => 1, //animais
            'created_at' => now(),
        ]);
    }
}
