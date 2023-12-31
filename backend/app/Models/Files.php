<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;

    protected $table = "files";
    protected $primaryKey = "id";
    protected $fillable = [
        "research_title",
        "research_file",
        "user_id",
        "initial_simmilarity_percentage",
        "similarity_percentage_results",
    ];
}