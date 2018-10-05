<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string|min:1|max:400'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        $id = auth()->user()->id;
        $postId = Post::where('owner_id', $id)->max('post_id');
        $postId = isset($postId) ? $postId + 1 : 0;

        $post = Post::create([
            'owner_id' => $id,
            'post_id' => $postId,
            'text' => $request->text
        ]);

        $user = User::find(auth()->user()->id);
        $post->name = $user->name;
        $post->avatar = url('images/' . $user->avatar);
        $post->isLiked = false;
        $post->likesCount = 0;
        $post->commentsCount = 0;

        return response()->json([
            "message" => "Post successfully created",
            "newPost" => $post
        ], 200);
    }

    public function getPosts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'required|int',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if (isset($maxPostId)) {
            $posts = Post::where('owner_id', $request->owner_id)
                ->latest()
                ->take(1000)
                ->get();

            foreach ($posts as $post)
                $post->likesCount = $post->likesCount();
            unset($post);

            return response()->json([
                "posts" => $posts
            ], 200);
        } else
            return response()->json([
                "error" => "User not found"
            ], 422);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|int',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors()
            ], 422);
        }

        if (Post::where('owner_id', auth()->user()->id)->where('post_id', $request->post_id)->delete())
            return response()->json(["message" => "Post deleted successfully"], 200);
        else
            return response()->json(["error" => "Something went wrong"], 422);
    }
}
