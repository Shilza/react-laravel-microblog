<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 5)->create()
            ->each(function ($u) {
                $u->posts()->save(factory(App\Post::class)->make());
            });
    }
}
