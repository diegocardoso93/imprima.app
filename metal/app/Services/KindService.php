<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class KindService
{
    public function getKindByName($name, $type)
    {
        $statement = DB::table('kinds')
            ->where('kinds.status', '=', 1);

        if ($name) {
            $statement->where('kinds.name', '=', $name);
        } else {
            $statement->orderByRaw('rand()');
        }

        return $statement->first();
    }
}
