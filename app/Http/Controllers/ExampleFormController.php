<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExampleMessageRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExampleFormController extends Controller
{
    /**
     * Display the example form.
     */
    public function create(): Response
    {
        return Inertia::render('ExampleForm');
    }

    /**
     * Validate and handle the example form submission.
     */
    public function store(StoreExampleMessageRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Replace this with your application's logic — for example, storing
        // the message in the database or sending a notification.
        return to_route('example-form.create')
            ->with('success', "Thanks, {$data['name']}. Your message passed validation.");
    }
}
