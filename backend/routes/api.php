<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// REGISTER STUDENT
Route::post('/students/register', 'App\Http\Controllers\StudentController@RegisterMobile');

// REGISTER FACULTY
Route::post('/facultymember/register', 'App\Http\Controllers\FacultyController@RegisterMobile');

// REGISTER STAFG
Route::post('/staff/register', 'App\Http\Controllers\StaffController@RegisterMobile');

Route::post('/login-mobile', 'Auth\LoginController@LoginMobile');

Route::post('/upload_file', 'App\Http\Controllers\StudentController@upload_file');

Route::get('/myfiles/{id}', 'App\Http\Controllers\StudentController@myfiles')->name('myfiles');

Route::delete('/delete_file/{file}', 'StudentController@deleteFile');

Route::post('/add-announcements', 'AdminController@addAnnouncements');

Route::get('/announcements', 'AdminController@listAnnouncement');

Route::get('/get_files/{id}', 'App\Http\Controllers\StudentController@get_files')->name('get_files');

Route::post('/apply-certification', 'App\Http\Controllers\RequestingFormController@apply_certifications');