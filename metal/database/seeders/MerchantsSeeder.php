<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchants')->insert([
            'name' => 'UzaPrint',
            'phone' => '48996415657',
            'lat' => -28.4812066,
            'lon' => -49.0064517,
            'zip' => '88701105',
            'city' => 'Tubarão',
            'uf' => 'SC',
            'neighborhood' => 'Centro',
            'address' => 'Av. Marcolino Martins Cabral, 1315',
            'address_extra' => 'Praça Shopping',
            'max_distance' => 30,
            'delivery' => true,
            'created_at' => now(),
        ]);

        DB::table('merchants')->insert([
            'name' => 'HDA Personalizações',
            'phone' => '48991119511',
            'lat' => -28.4734123,
            'lon' => -49.0130107,
            'zip' => '88704400',
            'city' => 'Tubarão',
            'uf' => 'SC',
            'neighborhood' => 'Humaitá',
            'address' => 'R. Roberto Zumblick, 822',
            'address_extra' => 'Sala 02',
            'delivery' => false,
            'created_at' => now(),
        ]);
    }
}
