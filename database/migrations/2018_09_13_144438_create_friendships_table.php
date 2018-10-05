<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFriendshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friendships', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->unsignedInteger('subscriber_id');
            $table->integer('created_at');

            $table->foreign('id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('subscriber_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->primary(['id', 'subscriber_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friendships');
    }
}
