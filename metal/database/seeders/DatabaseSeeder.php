<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CepsSeeder::class,
            ProductsSeeder::class,
            ProductsAttributesSeeder::class,
            MerchantsSeeder::class,
            MerchantsProductsSeeder::class,
            MerchantsProductsSeeder::class,
            MerchantsProductsAttributesSeeder::class,
        ]);

        // php artisan config:cache
        // composer dump-autoload
        // php artisan migrate:refresh --seed
    }
}
