<?php

namespace App\Http\Controllers;

use App\Friendships;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FriendshipsController extends Controller
{
    public function follow(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if($request->id == auth()->user()->id)
            return response()->json([
                "error" => "You can not subscribe to yourself"
            ], 403);

        if(!is_null(Friendships::where('id', $request->id)
            ->where('subscriber_id', auth()->user()->id)->first()))
            return response()->json([
                "error" => "You can not subscribe more than once"
            ], 403);

        if(!is_null(User::find($request->id))){
            Friendships::create(['id' => $request->id,
                'subscriber_id' => auth()->user()->id]);

            return response()->json([
                "message" => "Following was successful"
            ], 200);
        }
        else
            return response()->json([
                "error" => "Users with this id not found"
            ], 404);

    }

    public function unfollow(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if($request->id == auth()->user()->id)
            return response()->json([
                "error" => "You can not unsubscribe from yourself"
            ], 403);

        if(is_null(Friendships::where('id', $request->id)
            ->where('subscriber_id', auth()->user()->id)->first()))
            return response()->json([
                "error" => "You cannot unsubscribe. You are not subscribed to this user"
            ], 403);

        if(!is_null(User::find($request->id))){
            Friendships::where('id',  $request->id)
                ->where('subscriber_id', auth()->user()->id)
                ->delete();

            return response()->json([
                "message" => "Unfollowing was successful"
            ], 200);
        }
        else
            return response()->json([
                "error" => "Users with this id not found"
            ], 404);
    }
}
