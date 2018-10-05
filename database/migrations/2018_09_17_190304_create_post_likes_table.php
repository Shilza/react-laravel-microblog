<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_likes', function (Blueprint $table) {
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('liker_id');
            $table->unsignedInteger('post_id');
            $table->integer('created_at');

            $table->foreign(['owner_id', 'post_id'])
                ->references(['owner_id', 'post_id'])->on('posts')
                ->onDelete('cascade');

            $table->primary(['owner_id', 'post_id', 'liker_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_likes');
    }
}
