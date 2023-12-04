<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementsPhoto extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public $table = 'announcementsphoto';

    protected $fillable = ['announcements_id','img_path'];

    public function announcements() {
        return $this->belongsTo('App\Models\Announcements');
    }
}