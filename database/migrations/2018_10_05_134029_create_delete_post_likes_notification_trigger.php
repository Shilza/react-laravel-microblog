<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateDeletePostLikesNotificationTrigger extends Migration
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
        TRIGGER `delete_post_like_notification`
        BEFORE DELETE ON `post_likes`
        FOR EACH ROW DELETE FROM notifications
        WHERE owner_id = OLD.owner_id
        AND entity_id=CONCAT(OLD.liker_id, \'.\', OLD.post_id) AND type = \'post_like\'
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `delete_post_like_notification`');
    }
}
