<?php

namespace App\Http\Controllers;

use App\Friendships;
use App\Post;
use App\PostLikes;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use stdClass;

class UsersController extends Controller
{
    public function getUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        $user = User::whereName($request->username)->first();
        if (isset($user)) {
            $user->postsCount = $user->postsCount();
            $user->followersCount = $user->followersCount();
            $user->followsCount = $user->followsCount();
            $user->likedCount = $user->likedCount();
            $user->isFollowed = (boolean)Friendships::where('id', $user->id)
                ->where('subscriber_id', auth()->user()->id)->first();
            $user->avatar = url('images/' . $user->avatar);

            $posts = $user->posts()->latest()->get();
            foreach ($posts as &$post) {
                $post->name = $user->name;
                $post->avatar = $user->avatar;
                $post->isLiked =
                    count(PostLikes::where('owner_id', $post->owner_id)
                        ->where('post_id', $post->post_id)
                        ->where('liker_id', auth()->user()->id)
                        ->get()) > 0 ? true : false;
                $post->likesCount = $post->likesCount();
                $post->commentsCount = $post->commentsCount();
            }
            return response()->json([
                "user" => $user,
                "posts" => $posts,
            ], 200);
        } else
            return response()->json([
                "error" => "Users not found"
            ], 404);
    }

    public function recommended()
    {
        $users = User::where('id', '!=', auth()->user()->id)
            ->inRandomOrder()->take(3)->get();
        foreach ($users as &$user) {
            $user->avatar = url('images/' . $user->avatar);
            $user->isFollowed = (boolean)Friendships::where('id', $user->id)
                ->where('subscriber_id', auth()->user()->id)->first();
        }
        unset($user);

        return response()->json([
            "users" => $users
        ], 200);
    }


    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:16|min:3',
            'about' => 'required|string|max:400'
        ]);
        if ($validator->fails())
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);

        $user = User::find(auth()->user()->id);
        $user->name = $request->username;
        $user->about = $request->about;
        $user->save();
        $user->avatar = url('images/' . $user->avatar);
        $user->postsCount = $user->postsCount();
        $user->followersCount = $user->followersCount();
        $user->followsCount = $user->followsCount();
        $user->likedCount = $user->likedCount();
        $user->isFollowed = (boolean)Friendships::where('id', $user->id)
            ->where('subscriber_id', auth()->user()->id)->first();

        return response()->json([
            "message" => "Updated successfully",
            "user" => $user
        ], 200);
    }

    public function updateAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'imageFiles' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);
        if ($validator->fails())
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);

        if ($request->hasFile('imageFiles')) {
            $image = $request->file('imageFiles');
            $fileName = auth()->user()->id . time() . '.' . $image->getClientOriginalExtension();
            $image->move('images/', $fileName);

            Image::make('images/' . $fileName)->resize(500, 500)->save();

            $user = User::find(auth()->user()->id);
            $user->avatar = $fileName;
            $user->save();
        }
        return response()->json('image is loaded', 200);
    }

    public function getFollowers(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:16|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if (User::where('name', $request->username)->first())
            return response()->json([
                "followers" => $this->followers($request->username)
            ], 200);
        else
            return response()->json([
                "error" => "User not found"
            ], 404);
    }

    private function followers($name, $take = 20)
    {
        $users = [];

        foreach (
            User::where('name', $name)
                ->first()->followers()->take($take)
                ->latest()->get() as $item
        ) {
            $user = User::find($item->subscriber_id);
            $user->followersCount = $user->followersCount();
            $user->followingDate = $item->created_at->timestamp;
            $user->avatar = url('images/' . $user->avatar);
            array_push($users, $user);
        }

        return $users;
    }

    public function getFollows(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:16|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if (User::where('name', $request->username)->first())
            return response()->json([
                "follows" => $this->follows($request->username)
            ], 200);
        else
            return response()->json([
                "error" => "User not found"
            ], 404);
    }

    private function follows($name, $take = 20)
    {
        $users = [];

        foreach (
            User::where('name', $name)
                ->first()->follows()->take($take)
                ->latest()->get() as $item
        ) {
            $user = User::find($item->id);
            $user->followersCount = $user->followersCount();
            $user->followingDate = $item->created_at->timestamp;
            $user->avatar = url('images/' . $user->avatar);

            array_push($users, $user);
        }

        return $users;
    }

    public function search(Request $request)
    {
        $us = User::where('name', 'like', '%' . $request->username . '%')->get();
        $users = [];

        foreach ($us as &$u) {
            $user = new StdClass();
            $user->title = $u->name;
            $user->description = $u->about;
            $user->avatar = url('images/' . $u->avatar);
            array_push($users, $user);
        }
        unset($u);

        return response()->json([
            "users" => $users
        ], 200);
    }

    public function getLiked(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:16|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if ($user = User::where('name', $request->username)->first())
            $likes = PostLikes::where(
                'liker_id', $user->id
            )->get(['owner_id', 'post_id'])->toArray();
        else
            return response()->json([
                "error" => "User not found"
            ], 404);

        if (count($likes)) {
            $posts = Post::whereInMultiple(
                ['owner_id', 'post_id'], $likes
            )->latest()->take(1000)->get();

            foreach ($posts as &$post)
                $post->avatar = url('images/' . User::find($post->owner_id)->avatar);
            unset($post);

            return response()->json([
                "posts" => $posts
            ], 200);
        } else
            return response()->json([
                "posts" => []
            ], 200);
    }

    public function delete()
    {
        if (User::find(auth()->user()->id)->delete())
            return response()->json([
                "message" => "User successfully deleted"
            ], 200);
        else
            return response()->json([
                "message" => "Something went wrong"
            ], 403);
    }
}

