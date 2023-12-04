<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public static $rules = [
        'description'=>'required',
        'fee'=>'required',
        'user_id'=>'required'];

    protected $fillable = ['title','content','user_id'];

    public function announcementsphoto() {
        return $this->hasMany('App\Models\AnnouncementsPhoto','announcements_id');
    }

}