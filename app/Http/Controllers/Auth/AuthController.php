<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Utils\RefreshHelper\RefreshHelper;
use JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login', 'register', 'refresh']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        $access = auth()->attempt($credentials);

        if (!$access)
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Incorrect login or password'
            ], 401);

        $user = auth()->user();
        $user->postsCount = $user->postsCount();
        $user->followersCount = $user->followersCount();
        $user->followsCount = $user->followsCount();
        $user->notificationsCount = $user->notificationsCount();
        $user->avatar = url('images/'.$user->avatar);

        $refresh = RefreshHelper::generateRefresh($user->id);
        User::where('id', $user->id)->update(['refresh_token' => $refresh]);

        return response()->json([
            'user'  => $user,
            'access_token' => $access,
            'expires_in' => time() + auth()->factory()->getTTL() * 60,
            'refresh_token' => $refresh
        ],200);
    }

    /**
     * Get the authenticated Users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = User::whereId(auth()->user()->id)->first();
        $user->postsCount = $user->postsCount();
        $user->followersCount = $user->followersCount();
        $user->followsCount = $user->followsCount();
        $user->notificationsCount = $user->notificationsCount();
        $user->avatar = url('images/'.$user->avatar);

        return response()->json([
            'user' => $user,
            ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {

        User::whereId(auth()->user()->id)->update(['refresh_token' => '']);

        auth()->logout();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        $id = RefreshHelper::getIdFromToken($request->header('Refresh'));
        $refresh = RefreshHelper::generateRefresh($id);
        User::whereId($id)->update(['refresh_token' => $refresh]);

        try{
            JWTAuth::parseToken()->authenticate();
        } finally {
            $refreshed = JWTAuth::refresh(JWTAuth::getToken());
            return $this->respondWithTokens($refreshed, $refresh);
        }
    }

    /**
     * @param $access
     * @param $refresh
     * @return \Illuminate\Http\JsonResponse
     */
    private function respondWithTokens($access, $refresh)
    {
        return response()->json([
            'access_token' => $access,
            'token_type' => 'bearer',
            'expires_in' => time() + auth()->factory()->getTTL() * 60,
            'refresh_token' => $refresh
        ], 200);
    }

    public function register(Request $request)
    {
        $validator =  Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if($validator->fails()){
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        $request->merge(['password' => Hash::make($request->password),
            'refresh_token' => RefreshHelper::generateRefresh(User::count()+1)]);

        //if user was soft deleted
        if($user = User::where('email', $request->email)->onlyTrashed()->first()){
            $user->restore();
            return response()->json(['status' => 'Restored successfully'],200);
        }
        try{
            User::create($request->all());
            return response()->json(['status' => 'Registered successfully'],200);
        }
        catch(Exception $e){
            return response()->json([
                "message" => "Could not register"
            ], 400);
        }
    }
}
