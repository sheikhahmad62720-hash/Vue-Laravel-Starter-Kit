<?php

use App\Http\Controllers\ExampleFormController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

Route::controller(ExampleFormController::class)->group(function (): void {
    Route::get('/example-form', 'create')->name('example-form.create');
    Route::post('/example-form', 'store')->name('example-form.store');
});
