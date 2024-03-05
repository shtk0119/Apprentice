<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\TagResource;

class TagCollection extends ResourceCollection
{
    public static $wrap = 'tags';

    public $collects = TagResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
