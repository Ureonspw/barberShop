<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CaissierController extends Controller
{
    /**
     * Display the caissier page.
     */
    public function index(): Response
    {
        return Inertia::render('caissierpage/caissierPage');
    }
} 