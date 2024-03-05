<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    public static $wrap = 'tag';
    
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->resource->name
        ];
    }
}
