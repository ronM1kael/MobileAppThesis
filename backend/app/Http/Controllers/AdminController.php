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
}
