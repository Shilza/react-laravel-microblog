<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostLikes;
use App\User;

class FeedController extends Controller
{
    public function feed()
    {
        $feedIds = [];
        foreach (User::find(auth()->user()->id)->follows()->get() as $item)
            array_push($feedIds, $item->id);
        array_push($feedIds, auth()->user()->id);

        $posts = Post::whereIn('owner_id', $feedIds)
            ->latest()->take(1000)->get();

        foreach ($posts as &$post) {
            $user = User::find($post->owner_id);
            $post->name = $user->name;
            $post->avatar = url('images/' . $user->avatar);
            $post->isLiked =
                count(PostLikes::where('owner_id', $post->owner_id)
                    ->where('post_id', $post->post_id)
                    ->where('liker_id', auth()->user()->id)
                    ->get()) > 0 ? true : false;
            $post->likesCount = $post->likesCount();
            $post->commentsCount = $post->commentsCount();
        }
        //Prevent reference bugs
        unset($post);

        return response()->json([
            'posts' => $posts
        ], 200);
    }
}
