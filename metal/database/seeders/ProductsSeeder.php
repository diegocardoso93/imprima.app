<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductsSeeder extends Seeder
{
    static $types = [
        '1' => 'Camiseta',
        '2' => 'Caneca',
        '3' => 'Almofada',
        '4' => 'Quadro'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (CategoriesSeeder::$keys as $cIdx => $category) {
            $path = public_path('img/produto/'.$category);
            $files = File::files($path);
            foreach ($files as $file) {
                $matches = [];
                $filename = $file->getFilename();
                preg_match('/(\d+)([^\d+].*)(\d+)/', $filename, $matches);
                if (count($matches) === 4) {
                    [, , $name, $type] = $matches;
                    $vName = str_replace('_', ' ', $name);
                    DB::table('products')->insert([
                        'kind_id' => DB::table('kinds')->select('id')
                            ->where('name', '=', $vName)->pluck('id')->first(),
                        'category_id' => $cIdx+1,
                        'type_id' => $type,
                        'name' => self::$types[$type] . ' ' . $vName,
                        'url' => 'https://imprima.app/img/produto/'.$category.'/' . $filename,
                        'thumb_url' => 'https://imprima.app/img/produto/'.$category.'/thumb/' . $filename
                    ]);
                }
            }
        }
    }
}
