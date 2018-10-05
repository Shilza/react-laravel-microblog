<?php

namespace App;


use Awobaz\Compoships\Compoships;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Compoships;

    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $fillable = ['owner_id', 'post_id', 'text'];

    public function likes(){
        return $this->hasMany('App\PostLikes',
            ['owner_id', 'post_id'], ['owner_id', 'post_id']);
    }

    public function likesCount(){
        return $this->hasMany('App\PostLikes',
            ['owner_id', 'post_id'], ['owner_id', 'post_id'])->count();
    }

    public function comments(){
        return $this->hasMany('App\Comment',
            ['owner_id', 'post_id'], ['owner_id', 'post_id']);
    }

    public function commentsCount(){
        return $this->hasMany('App\Comment',
            ['owner_id', 'post_id'], ['owner_id', 'post_id'])->count();
    }

    /**
     * @param array $columns
     * @param $values
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function whereInMultiple(array $columns, $values)
    {
        $values = array_map(function (array $value) {
            return "('".implode($value, "', '")."')";
        }, $values);

        return static::query()->whereRaw(
            '('.implode($columns, ', ').') in ('.implode($values, ', ').')'
        );
    }
}
