<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateDeleteFollowsNotificationTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE DEFINER=`root`@`%`
        TRIGGER `delete_follows_notification`
        BEFORE DELETE ON `friendships`
        FOR EACH ROW DELETE FROM notifications
        WHERE owner_id = OLD.id AND type = \'follow\'
        AND entity_id=OLD.subscriber_id
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `delete_follows_notification`');
    }
}
