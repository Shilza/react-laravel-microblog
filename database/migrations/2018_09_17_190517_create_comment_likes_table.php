<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_likes', function (Blueprint $table) {
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('post_id');
            $table->unsignedInteger('comment_id');
            $table->unsignedInteger('liker_id');
            $table->integer('created_at');

            $table->foreign(['owner_id', 'post_id', 'comment_id'])
                ->references(['owner_id', 'post_id', 'comment_id'])->on('comments')
                ->onDelete('cascade');

            $table->primary(['owner_id', 'post_id', 'comment_id', 'liker_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment_likes');
    }
}
