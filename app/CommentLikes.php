<?php

namespace App;

class CommentLikes extends \Awobaz\Compoships\Database\Eloquent\Model
{
    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $fillable = ['owner_id', 'liker_id', 'post_id', 'comment_id'];
}
