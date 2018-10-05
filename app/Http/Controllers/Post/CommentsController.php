<?php

namespace App\Http\Controllers\Post;

use App\Comment;
use App\CommentLikes;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'required|int',
            'post_id' => 'required|int',
            'text' => 'required|string|min:1|max:400',
            'reply_to_id' => 'int'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        $commentId = Comment::where('owner_id', $request->owner_id)
            ->where('post_id', $request->post_id)
            ->max('comment_id');
        $commentId = isset($commentId) ? $commentId + 1 : 0;

        $comment = Comment::create([
            'owner_id' => $request->owner_id,
            'post_id' => $request->post_id,
            'comment_id' => $commentId,
            'reply_to_id' => $request->reply_to_id,
            'commentator_id' => auth()->user()->id,
            'text' => $request->text]);
        $user = User::find(auth()->user()->id);
        $comment->name = $user->name;
        $comment->avatar = url('images/'.$user->avatar);
        $comment->reply_name = $comment->reply_to_id ?
            User::find($comment->reply_to_id)->name :
            null;
        $comment->isLiked = false;
        $comment->likesCount = 0;

        return response()->json([
            "message" => "Comment successfully created",
            "comment" => $comment
        ], 200);
    }

    public function delete(Request $request)
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

        $comment = Comment::where('owner_id', $request->owner_id)
            ->where('post_id', $request->post_id)
            ->where('comment_id', $request->comment_id)
            ->first();

        if (isset($comment) &&
            ($comment->owner_id == auth()->user()->id ||
            $comment->commentator_id == auth()->user()->id)) {
            Comment::where('owner_id', $request->owner_id)
                ->where('post_id', $request->post_id)
                ->where('comment_id', $request->comment_id)
                ->delete();

            return response()->json([
                "message" => "Comment deleted successfully"
            ], 200);
        } else
            return response()->json([
                "error" => "You can not delete this comment"
            ], 403);
    }

    public function getComments(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'required|int',
            'post_id' => 'required|int',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        $comments = Comment::where('owner_id', $request->owner_id)
            ->where('post_id', $request->post_id)
            ->latest()
            ->get();
        foreach ($comments as &$comment){
            $user = User::find($comment->commentator_id);
            $comment->likesCount = $comment->likesCount();
            $comment->name = $user->name;
            $comment->avatar = url('images/'.$user->avatar);
            $comment->reply_name = $comment->reply_to_id ? $user->name : null;
            $comment->isLiked =
                count(CommentLikes::where('owner_id', $comment->owner_id)
                    ->where('post_id', $comment->post_id)
                    ->where('comment_id', $comment->comment_id)
                    ->where('liker_id', auth()->user()->id)
                    ->get()) > 0 ? true : false;
        }
        //Prevent reference bugs
        unset($comment);

        return response()->json([
            "comments" => $comments
        ], 200);
    }
}
