<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestingForm extends Model
{
    use HasFactory;

    public $table = "requestingform";
    public $timestamps = false;
    public $primaryKey = "id";
    public $guarded = [
        "id"
    ];

    protected $fillable = [
        "date",
        "email_address",
        "thesis_type",
        "advisors_turnitin_precheck",
        "adviser_name",
        "submission_frequency",
        "research_specialist",
        "tup_id",
        "requestor_name",
        "tup_mail",
        "sex",
        "requestor_type",
        "college",
        "course",
        "research_title",
        "purpose",
        "initial_simmilarity_percentage",
        "researchers_name1",
        "researchers_name2",
        "researchers_name3",
        "researchers_name4",
        "researchers_name5",
        "researchers_name6",
        "researchers_name7",
        "researchers_name8",
        "adviser_email",
        "research_file",
        "agreement",
        "score",
        "research_staff",
        "status",
        "simmilarity_percentage_results",
        "date_processing_end",
        "user_id"
    ];
}
