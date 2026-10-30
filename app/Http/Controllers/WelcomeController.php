<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Display the starter kit welcome page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('Welcome');
    }
}
