<?php

namespace App;

use Awobaz\Compoships\Database\Eloquent\Model;

class Comment extends Model
{
    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $fillable =
        [
            'owner_id',
            'post_id',
            'comment_id',
            'reply_to_id',
            'text',
            'commentator_id',
        ];

    public function likes()
    {
        return $this->hasMany('App\CommentLikes',
            ['owner_id', 'post_id', 'comment_id'], ['owner_id', 'post_id', 'comment_id']);
    }

    public function likesCount()
    {
        return $this->hasMany('App\CommentLikes',
            ['owner_id', 'post_id', 'comment_id'], ['owner_id', 'post_id', 'comment_id'])->count();
    }

}
