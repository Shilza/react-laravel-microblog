<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Friendships extends Model
{
    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $fillable = ['id', 'subscriber_id'];
}
