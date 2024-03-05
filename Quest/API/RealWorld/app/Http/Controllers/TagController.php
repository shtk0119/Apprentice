<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TagController extends Controller
{
    public function list()
    {
        $tags = Tag::all();

        return response()->json([
            'tags' => $tags
        ]);
    }
}
