<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    const UPDATED_AT = null;

    protected $dateFormat = 'U';

    protected $fillable = ['id', 'type'];

    protected $hidden = ['owner_id'];
}
