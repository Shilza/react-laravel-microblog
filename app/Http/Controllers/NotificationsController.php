<?php

namespace App\Http\Controllers;

use App\Notification;
use App\User;
use Illuminate\Support\Facades\Input;

class NotificationsController extends Controller
{
    public function get()
    {

        $notifications = User::find(auth()->user()->id)->notifications()
            ->latest()
            ->take(100)
            ->get();

        foreach ($notifications as &$notification) {
            $user = User::whereId(explode('.', $notification->entity_id)[0])->first();
            $notification->name = $user->name;
            $notification->avatar = url('images/' . $user->avatar);

            $entityData = explode( '.', $notification->entity_id);
            if(count($entityData) === 1)
                $notification->followerName = User::find($entityData[0])->name;
                if(count($entityData) === 2)
                $notification->post_id = $entityData[1];
            if (count($entityData) === 3) {
                $notification->comment_id = $entityData[2];
            }
            unset($notification->entity_id);
        }
        unset($notification);

        return response()->json(["notifications" => $notifications], 200);
    }

    public function delete()
    {
        Notification::where('owner_id', auth()->user()->id)->delete();

        return response()->json([
            "message" => "Notifications deleted successfully"
        ], 200);
    }
}
