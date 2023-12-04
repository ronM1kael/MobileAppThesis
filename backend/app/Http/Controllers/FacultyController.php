<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Models\User;
use View;
use DB;
use File;
use Auth;

class FacultyController extends Controller
{
    // backend for mobile
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

            $faculty = new Faculty;
            $faculty->fname = $request->fname;
            $faculty->lname = $request->lname;
            $faculty->mname = $request->mname;
            $faculty->department = $request->department;
            $faculty->position = $request->position;
            $faculty->designation = $request->designation;
            $faculty->tup_id = $request->tup_id;
            $faculty->email = $request->email;
            $faculty->gender = $request->gender;
            $faculty->phone = $request->phone;
            $faculty->address = $request->address;
            $faculty->birthdate = $request->birthdate;
            $faculty->user_id = $lastUserId;
            $faculty->save();

            auth()->login($user, true);

            $response['message'] = 'Registration successful';
            $response['user'] = $user;
            $response['faculty'] = $faculty;

            return response()->json($response, 200);
    }

    public function getProfile($id)
    {
            $faculty = DB::table('faculty')
                ->join('users', 'users.id', 'faculty.user_id')
                ->select('faculty.*', 'users.*')
                ->where('user_id', $id)
                ->first();

        return response()->json($faculty);
    }

}
