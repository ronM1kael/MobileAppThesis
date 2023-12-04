<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Staff;
use App\Models\User;
use View;
use DB;
use File;
use Auth;

class StaffController extends Controller
{

    public function RegisterMobile(Request $request)
    { 
            $response = [];

            $user = new User;
            $user->fname = $request->fname;
            $user->lname = $request->lname;
            $user->mname = $request->mname;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->role = $request->role;   
            $user->save();
            $lastUserId = DB::getPdo()->lastInsertId();

            $staff = new Staff;
            $staff->fname = $request->fname;
            $staff->lname = $request->lname;
            $staff->mname = $request->mname;
            $staff->position = $request->position;
            $staff->designation = $request->designation;
            $staff->tup_id = $request->tup_id;
            $staff->email = $request->email;
            $staff->gender = $request->gender;
            $staff->phone = $request->phone;
            $staff->address = $request->address;
            $staff->birthdate = $request->birthdate;
            $staff->user_id = $lastUserId;
            $staff->save();

            auth()->login($user, true);

            $response['message'] = 'Registration successful';
            $response['user'] = $user;
            $response['staff'] = $staff;

            return response()->json($response, 200);
    }

    public function getProfile($id)
    {
            $staff = DB::table('staff')
                ->join('users', 'users.id', 'staff.user_id')
                ->select('staff.*', 'users.*')
                ->where('user_id', $id)
                ->first();   

        return response()->json($staff);
    }
}
