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
            CategoriesSeeder::class,
            TypesSeeder::class,
            KindsSeeder::class,
            MerchantsSeeder::class,
            MerchantsTypesAttributesSeeder::class,
            ProductsSeeder::class,
        ]);

        // php artisan config:cache
        // composer dump-autoload
        // php artisan migrate:refresh --seed
    }
}
