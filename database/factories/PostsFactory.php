<?php

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    $id = User::inRandomOrder()->first()->id;

    return [
        'post_id' => 0,
        'owner_id' => $id,
        'text' => $faker->text(40)
    ];
});
