<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;

Route::namespace('Auth')->prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh')->middleware('jwt_refresh');
    Route::post('me', 'AuthController@me');
    Route::post('payload', 'AuthController@payload');
    Route::post('register', 'AuthController@register');

    Route::group(['prefix' => 'password'], function () {
        Route::post('create', 'PasswordResetController@create');
        Route::post('reset', 'PasswordResetController@reset');
    });
});


Route::middleware('jwt')->group(function (){
    Route::get('feed', 'FeedController@feed');
    Route::get('user/{username?}', 'UsersController@getUser');
    Route::get('recommended', 'UsersController@recommended');
    Route::post('update_user', 'UsersController@updateUser');
    Route::post('update_avatar', 'UsersController@updateAvatar');
    Route::post('delete_profile', 'UsersController@delete');
    Route::get('followers/{username?}/{offset?}', 'UsersController@getFollowers');
    Route::get('follows/{username?}/{offset?}', 'UsersController@getFollows');
    Route::get('liked/{username?}', 'UsersController@getLiked');
    Route::get('search/{username?}', 'UsersController@search');

    Route::prefix('friendships')->group(function () {
        Route::post('follow', 'FriendshipsController@follow');
        Route::post('unfollow', 'FriendshipsController@unfollow');
    });

    Route::prefix('notifications')->group(function (){
        Route::post('delete', 'NotificationsController@delete');
        Route::get('{offset?}', 'NotificationsController@get');
    });

    Route::namespace('Post')->prefix('posts')->group(function () {
        Route::group(['prefix' => 'comments'], function () {
            Route::post('create', 'CommentsController@create');
            Route::post('delete', 'CommentsController@delete');
            Route::post('like', 'CommentLikesController@like');
            Route::post('unlike', 'CommentLikesController@unlike');
            Route::get('/{owner_id?}{post_id?}{offset?}', 'CommentsController@getComments');
        });

        Route::post('create', 'PostsController@create');
        Route::post('delete', 'PostsController@delete');
        Route::get('/{owner_id?}{offset?}', 'PostsController@getPosts');
        Route::post('like', 'PostLikesController@like');
        Route::post('unlike', 'PostLikesController@unlike');
    });
});
