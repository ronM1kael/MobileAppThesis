<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public $table = "students";
    public $timestamps = false;
    public $primaryKey = "id";
    public $guarded = [
        "id"
    ];

    protected $fillable = [
        "fname",
        "lname",
        "mname",
        "college",
        "course",
        "tup_id",
        "email",
        "gender",
        "phone",
        "address",
        "birthdate",
        "avatar",
        "user_id"
    ];
}
