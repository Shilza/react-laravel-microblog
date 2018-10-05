<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateDeleteCommentNotificationTrigger extends Migration
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
        TRIGGER `delete_comment_notification`
        BEFORE DELETE ON `comments`
        FOR EACH ROW DELETE FROM notifications
        WHERE owner_id = OLD.owner_id
        AND entity_id=CONCAT(OLD.commentator_id, \'.\', OLD.post_id, \'.\', OLD.comment_id)
        AND type = \'comment\'
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `delete_comment_notification`');
    }
}
