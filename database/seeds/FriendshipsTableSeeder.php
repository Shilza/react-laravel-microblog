<?php

use App\Friendships;
use App\User;
use Illuminate\Database\Seeder;

class FriendshipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        factory(Friendships::class, random_int(1, User::count()))->create();
    }
}
