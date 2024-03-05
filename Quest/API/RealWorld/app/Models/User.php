<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = ['email', 'password', 'username', 'bio', 'image'];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     * JWTのsubject claimに格納される識別子を取得する。
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     * JWTに追加するカスタムクレームを含むキー値配列を返します。
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
