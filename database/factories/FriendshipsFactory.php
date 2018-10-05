<?php

use App\Friendships;
use App\User;
use Faker\Generator as Faker;

$factory->define(Friendships::class, function (Faker $faker) {
    $id = User::inRandomOrder()->first()->id;
    $subs_id = User::where('id', '!=', $id)->inRandomOrder()->first()->id;

    return [
        'id' => $id,
        'subscriber_id' => $subs_id
    ];
});
