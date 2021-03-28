<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class KindsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (CategoriesSeeder::$keys as $idx => $category) {
            $path = public_path('img/produto/'.$category);
            $files = File::files($path);
            foreach ($files as $file) {
                $matches = [];
                $filename = $file->getFilename();
                preg_match('/(\d+)(.*[^\d+\.png])/', $filename, $matches);
                if (count($matches) === 3) {
                    [, , $name] = $matches;
                    $vName = str_replace('_', ' ', $name);
                    $ant = DB::table('kinds')->where('name', '=', $vName)->first();
                    if (!$ant) {
                        DB::table('kinds')->insert([
                            'name' => $vName,
                            'url' => 'https://imprima.app/img/produto/' . $category . '/' . $filename,
                            'category_id' => $idx + 1,
                            'created_at' => now(),
                        ]);
                    }
                }
            }
        }
    }
}
