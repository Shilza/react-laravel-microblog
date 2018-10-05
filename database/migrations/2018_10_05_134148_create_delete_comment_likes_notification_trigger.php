<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateDeleteCommentLikesNotificationTrigger extends Migration
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
        TRIGGER `delete_comment_like_notification`
        BEFORE DELETE ON `comment_likes`
        FOR EACH ROW DELETE FROM notifications
        WHERE owner_id = OLD.owner_id
        AND entity_id=CONCAT(OLD.liker_id, \'.\', OLD.post_id, \'.\', OLD.comment_id)
        AND type = \'comment_like\'
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `delete_comment_like_notification`');
    }
}
