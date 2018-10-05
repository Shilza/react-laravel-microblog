<?php

namespace App\Http\Controllers\Post;

use App\Comment;
use App\CommentLikes;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentLikesController extends Controller
{
    public function like(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'required|int',
            'post_id' => 'required|int',
            'comment_id' => 'required|int'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if (
            is_null(CommentLikes::where('owner_id', $request->owner_id)
                ->where('post_id', $request->post_id)
                ->where('comment_id', $request->comment_id)
                ->where('liker_id', auth()->user()->id)
                ->first()) &&
            !is_null(Comment::where('owner_id', $request->owner_id)
                ->where('post_id', $request->post_id)
                ->where('comment_id', $request->comment_id)
                ->first())
        ) {

            CommentLikes::create(['owner_id' => $request->owner_id,
                'post_id' => $request->post_id,
                'comment_id' => $request->comment_id,
                'liker_id' => auth()->user()->id]);

            return response()->json([
                "message" => "Liked successfully"
            ], 200);
        } else
            return response()->json([
                "error" => "Like error"
            ], 403);
    }

    public function unlike(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'required|int',
            'post_id' => 'required|int',
            'comment_id' => 'required|int'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if (!is_null(CommentLikes::where('owner_id', $request->owner_id)
            ->where('post_id', $request->post_id)
            ->where('comment_id', $request->comment_id)
            ->first())) {
            CommentLikes::where('owner_id', $request->owner_id)
                ->where('post_id', $request->post_id)
                ->where('comment_id', $request->comment_id)
                ->where('liker_id', auth()->user()->id)
                ->delete();

            return response()->json([
                "message" => "Unliked succssfully"
            ], 200);
        } else
            return response()->json([
                "error" => "Unlike error"
            ], 403);
    }
}
