<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\User;
use View;
use DB;
use File;
use Auth;

use App\Models\Files;

class StudentController extends Controller
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

        $student = new Student;
        $student->fname = $request->fname;
        $student->lname = $request->lname;
        $student->mname = $request->mname;
        $student->college = $request->college;
        $student->course = $request->course;
        $student->tup_id = $request->tup_id;
        $student->email = $request->email;
        $student->gender = $request->gender;
        $student->phone = $request->phone;
        $student->address = $request->address;
        $student->birthdate = $request->birthdate;
        $student->user_id = $lastUserId;
        $student->save();

        auth()->login($user, true);

        $response['message'] = 'Registration successful';
        $response['user'] = $user;
        $response['student'] = $student;

        return response()->json($response, 200);
    }

    public function myfiles($id)
    {
        $student = DB::table('students')
            ->join('users', 'users.id', 'students.user_id')
            ->select('students.*', 'users.*')
            ->where('user_id', $id)
            ->first();

        $myfiles = DB::table('files')
            ->join('users', 'users.id', '=', 'files.user_id')
            ->join('students', 'students.user_id', '=', 'users.id')
            ->select('files.*')
            ->where('files.user_id', $id)
            ->get();

        return response()->json(['student' => $student, 'myfiles' => $myfiles]);
    }

    public function deleteFile(Files $file)
    {
        try {
            // Delete the file from the storage
            Storage::delete('uploads/pdf/' . $file->research_file);

            // Delete the file record from the database
            $file->delete();

            return response()->json(['message' => 'File deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'File deletion failed'], 500);
        }
    }

    public function get_files($id)
    {
        $student = DB::table('students')
            ->join('users', 'users.id', 'students.user_id')
            ->select('students.*', 'users.*')
            ->where('user_id', $id)
            ->first();

        $files = DB::table('files')
            ->join('users', 'users.id', '=', 'files.user_id')
            ->join('students', 'students.user_id', '=', 'users.id')
            ->select('files.*')
            ->where('files.user_id', $id)
            ->get();

        return response()->json(['student' => $student, 'files' => $files]);
    }
    
}