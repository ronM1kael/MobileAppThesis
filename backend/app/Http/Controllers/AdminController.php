<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Staff;
use App\Models\Faculty;
use App\Models\User;
use App\Models\Announcement;
use App\Http\Redirect;
use View;
use DB;
use File;
use Auth;

class AdminController extends Controller
{
    public function listAnnouncement()
    {
        return Announcement::all();
    }

    public function countUsers()
    {
        $staffCount = User::where('role', 'Staff')->count();
        $studentCount = User::where('role', 'Student')->count();
        $faculty = User::where('role', 'Faculty')->count();
    // Add more counts for other roles if needed

    return response()->json([
        'staff_request_count' => $staffCount,
        'student_request_count' => $studentCount,
        'faculty_request_count' => $faculty,
        // Add counts for other roles in a similar manner
    ]);
    
    }
}
