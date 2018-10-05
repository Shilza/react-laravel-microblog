<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateFollowNotificationTrigger extends Migration
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
        TRIGGER `follows_notification`
        BEFORE INSERT ON `friendships`
        FOR EACH ROW INSERT INTO notifications
        SET owner_id=NEW.id, type=\'follow\',
        entity_id=NEW.subscriber_id,
        created_at = UNIX_TIMESTAMP()
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `follows_notification`');
    }
}
