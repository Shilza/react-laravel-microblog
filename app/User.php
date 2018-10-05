<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes;

    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'refresh_token'
    ];

    protected $hidden = [
        'email', 'password', 'refresh_token', 'created_at', 'updated_at'
    ];

    public function notifications(){
        return $this->hasMany('App\Notification', 'owner_id');
    }

    public function notificationsCount(){
        return $this->hasMany('App\Notification', 'owner_id')->count();
    }

    public function posts(){
        return $this->hasMany('App\Post', 'owner_id');
    }

    public function postsCount(){
        return $this->hasMany('App\Post', 'owner_id')->count();
    }

    public function followers(){
        return $this->hasMany('App\Friendships', 'id');
    }

    public function followersCount(){
        return $this->hasMany('App\Friendships', 'id')->count();
    }

    public function follows(){
        return $this->hasMany('App\Friendships', 'subscriber_id');
    }

    public function followsCount(){
        return $this->hasMany('App\Friendships', 'subscriber_id')->count();
    }

    public function likedCount(){
        return $this->hasMany('App\PostLikes', 'liker_id')->count();
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}