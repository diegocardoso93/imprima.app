<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class ImageController extends Controller
{
    public function process(Request $request)
    {
        // @TODO: teststuff

        $file = $request->file('file');
        $filename = $file->getClientOriginalName();
        $file->move(public_path('/userspace/images'), $filename);
        $fullpathImgIn = public_path('/userspace/images') . $filename;
        // python main.py -i casal3.jpg -o output.png -m u2netp -prep None -postp No

        $fullpathImgOut = public_path('/userspace/images') . '/output.png';

        exec('python ' . base_path() . '../mage/main.py -i ' . $fullpathImgIn . ' -o ' . $fullpathImgOut . ' -m u2netp -prep None -postp No');

        return new Response([]);
    }
}
