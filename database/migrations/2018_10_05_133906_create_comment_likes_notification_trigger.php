<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateCommentLikesNotificationTrigger extends Migration
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
        TRIGGER `comments_likes_notification`
        BEFORE INSERT ON `comment_likes`
        FOR EACH ROW INSERT INTO notifications
        SET owner_id=NEW.owner_id, type=\'comment_like\',
        entity_id=CONCAT(NEW.liker_id, \'.\', NEW.post_id, \'.\', NEW.comment_id),
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
        DB::unprepared('DROP TRIGGER `comments_likes_notification`');
    }
}
