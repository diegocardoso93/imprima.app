<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CepsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = fopen(storage_path("files/ceps.txt"), "r");

        while(!feof($file)) {
            $line = trim(fgets($file));
            $parts = explode("\t", $line);
            $cityUf = explode('/', $parts[1] ?? '');
            if ($cityUf[0] ?? false) {
                DB::table('ceps')->insert([
                    'zip' => $parts[0],
                    'city' => $cityUf[0],
                    'uf' => $cityUf[1],
                    'neighborhood' => $parts[2] ?? null,
                    'address' => $parts[3] ?? null,
                    'address_extra' => $parts[4] ?? null,
                    'created_at' => now()
                ]);
            }
        }

        fclose($file);
    }
}
