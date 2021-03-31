<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ImageController extends Controller
{
    private $filetype = [
        'image/jpg' => '.jpg',
        'image/jpeg' => '.jpg',
        'image/png' => '.png'
    ];

    public function process(Request $request)
    {
        $filename = uniqid();
//        dd($request->get('filename'), $request->get('result'));
        $extension = $this->filetype[$request->get('filetype')];

        // @TODO: teststuff

        $fullfile = public_path('/userspace/images/') . $filename;

//        dd($fullfile . $extension, $fullfile);

        file_put_contents($fullfile . $extension, file_get_contents($request->get('result')));

//        $file = $request->file('image');
//        $filename = $file->getClientOriginalName();
//        $file->move(public_path('/userspace/images'), $filename);
//        $fullpathImgIn = public_path('/userspace/images') . $filename;
        // python main.py -i casal3.jpg -o output.png -m u2netp -prep None -postp No

//        $fullpathImgOut = public_path('/userspace/images') . '/output.png';

        $arr = [];
//        exec(, $arr, $t);

        $command = escapeshellcmd('python ../mage/main.py -i ' . $fullfile . $extension .' -o ' . $fullfile . '_out.png -m u2netp -prep None -postp No');
        $output = shell_exec($command);
        dd($output);

        return new Response([]);
    }
}
