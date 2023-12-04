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

    public function countRequest()
    {

        $submissionfreq1 = RequestingForm::where('submission_frequency', '1st Submission')->count();
        $submissionfreq2 = RequestingForm::where('submission_frequency', '2nd Submission')->count();
        $submissionfreq3 = RequestingForm::where('submission_frequency', '3rd Submission')->count();
        $submissionfreq4 = RequestingForm::where('submission_frequency', '4th Submission')->count();
        $submissionfreq5 = RequestingForm::where('submission_frequency', '5th Submission')->count();
        // Add more counts for other roles if needed

        return response()->json([
            'Submission_Frequent_1ST' => $submissionfreq1,
            'Submission_Frequent_2ND' => $submissionfreq2,
            'Submission_Frequent_3RD' => $submissionfreq3,
            'Submission_Frequent_4TH' => $submissionfreq2,
            'Submission_Frequent_5TH' => $submissionfreq3,
            // Add counts for other roles in a similar manner
        ]);

    }
}
