<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('post_id');
            $table->string('text', 400)->nullable();
            $table->integer('created_at');

            $table->foreign('owner_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->primary(['owner_id', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
