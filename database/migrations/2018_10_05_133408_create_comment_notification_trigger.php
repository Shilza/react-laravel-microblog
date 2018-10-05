<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateCommentNotificationTrigger extends Migration
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
          TRIGGER `comment_notification`
          BEFORE INSERT ON `comments`
          FOR EACH ROW INSERT INTO notifications SET
          owner_id=IF(NEW.reply_to_id != NEW.owner_id, NEW.reply_to_id, NEW.owner_id),
          type=IF(NEW.reply_to_id IS NOT NULL, \'reply\', \'comment\'),
          entity_id=CONCAT(NEW.commentator_id, \'.\', NEW.post_id, \'.\', NEW.comment_id,
          IF(NEW.reply_to_id IS NOT NULL, CONCAT(\'.\', NEW.reply_to_id), \'\')),
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
        DB::unprepared('DROP TRIGGER `comment_notification`');
    }
}
