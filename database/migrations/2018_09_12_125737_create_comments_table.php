<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('post_id');
            $table->unsignedInteger('comment_id');
            $table->unsignedInteger('commentator_id');
            $table->unsignedInteger('reply_to_id')->nullable();
            $table->string('text', 400);
            $table->integer('created_at');

            $table->foreign('owner_id')
                ->references('owner_id')->on('posts')
                ->onDelete('cascade');

            $table->primary(['owner_id', 'post_id', 'comment_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
