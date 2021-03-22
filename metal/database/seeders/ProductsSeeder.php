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
            'kind_id' => 1,
            'category_id' => 2,
            'type_id' => 1,
            'name' => 'Camiseta Grêmio',
            'url' => 'https://imprima.app/img/times/00gremio1.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00gremio1.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 1,
            'category_id' => 2,
            'type_id' => 2,
            'name' => 'Caneca Grêmio',
            'url' => 'https://imprima.app/img/times/00gremio2.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00gremio2.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 1,
            'category_id' => 2,
            'type_id' => 3,
            'name' => 'Quadro Grêmio',
            'url' => 'https://imprima.app/img/times/00gremio3.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00gremio3.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 1,
            'category_id' => 2,
            'type_id' => 3,
            'name' => 'Almofada Grêmio',
            'url' => 'https://imprima.app/img/times/00gremio4.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00gremio4.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 2,
            'category_id' => 2,
            'type_id' => 1,
            'name' => 'Camiseta Inter',
            'url' => 'https://imprima.app/img/times/00inter1.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00inter1.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 2,
            'category_id' => 2,
            'type_id' => 2,
            'name' => 'Caneca Inter',
            'url' => 'https://imprima.app/img/times/00inter2.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00inter2.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 2,
            'category_id' => 2,
            'type_id' => 3,
            'name' => 'Almofada Inter',
            'url' => 'https://imprima.app/img/times/00inter3.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00inter3.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 2,
            'category_id' => 2,
            'type_id' => 4,
            'name' => 'Quadro Inter',
            'url' => 'https://imprima.app/img/times/00inter4.png',
            'thumb_url' => 'https://imprima.app/img/times/thumb/00inter4.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 3,
            'category_id' => 1,
            'type_id' => 1,
            'name' => 'Camiseta Gatinho',
            'url' => 'https://imprima.app/img/animais/00gato1.png',
            'thumb_url' => 'https://imprima.app/img/animais/thumb/00gato1.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 3,
            'category_id' => 1,
            'type_id' => 2,
            'name' => 'Caneca Gatinho',
            'url' => 'https://imprima.app/img/animais/00gato2.png',
            'thumb_url' => 'https://imprima.app/img/animais/thumb/00gato2.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 3,
            'category_id' => 1,
            'type_id' => 3,
            'name' => 'Almofada Gatinho',
            'url' => 'https://imprima.app/img/animais/00gato3.png',
            'thumb_url' => 'https://imprima.app/img/animais/thumb/00gato3.png',
            'created_at' => now()
        ]);

        DB::table('products')->insert([
            'kind_id' => 3,
            'category_id' => 1,
            'type_id' => 4,
            'name' => 'Quadro Gatinho',
            'url' => 'https://imprima.app/img/animais/00gato4.png',
            'thumb_url' => 'https://imprima.app/img/animais/thumb/00gato4.png',
            'created_at' => now()
        ]);
    }
}
