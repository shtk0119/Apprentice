<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\ArticleResouce;

class ArticleCollection extends ResourceCollection
{
    public static $wrap = 'articles';

    public $collects = ArticleResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    public function with(Request $request): array
    {
        return [
            'articlesCount' => $this->collection->count()
        ];
    }
}
