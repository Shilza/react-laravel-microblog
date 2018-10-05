<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreatePostLikesNotificationTrigger extends Migration
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
        TRIGGER `post_like_notification`
        BEFORE INSERT ON `post_likes`
        FOR EACH ROW INSERT INTO notifications
        SET owner_id=NEW.owner_id, type=\'post_like\',
        entity_id=CONCAT(NEW.liker_id, \'.\', NEW.post_id),
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
        DB::unprepared('DROP TRIGGER `post_like_notification`');
    }
}
