<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    public $table = "faculty";
    public $timestamps = false;
    public $primaryKey = "id";
    public $guarded = [
        "id"
    ];

    protected $fillable = [
        "fname",
        "lname",
        "mname",
        "department",
        "position",
        "designation",
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
