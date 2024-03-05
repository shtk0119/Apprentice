<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    protected $token;

    public function __construct($resource, $token)
    {
        // 親クラスのコンストラクタを呼び出し
        parent::__construct($resource);
        // トークンをセット
        $this->token = $token;
    }

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string
     */
    public static $wrap = "user";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "email" => $this->resource->email,
            "username" => $this->resource->username,
            "bio" => $this->resource->big ?? "",
            "image" => $this->resource->image ?? "",
            "token" => $this->token,
        ];
    }
}
