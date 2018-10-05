<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->unsignedInteger('owner_id');
            $table->string('type', 15);
            $table->string('entity_id');
            $table->integer('created_at');

            $table->foreign('owner_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->primary(['owner_id', 'type', 'entity_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
