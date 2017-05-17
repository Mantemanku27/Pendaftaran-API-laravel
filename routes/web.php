<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Landing Page
Route::get('/', ['as' => 'page', 'uses' => 'PageController@landingpage']);
Route::get('/landingpage', ['as' => 'token', 'uses' => 'PageController@landingpage']);
// Sign Up
Route::get('/signup', ['as' => 'signup', 'uses' => 'PageController@signup']);
// Dashboard
Route::get('/pendaftaran', ['as' => 'pendaftaran', 'uses' => 'PageController@pendaftaran']);
// login
Route::get('give-me-token', ['as' => 'token', 'uses' => 'PageController@token']);
Route::get('/login', ['as' => 'login', 'uses' => 'PageController@getLogin']);
// Konfirmasi Email
Route::get('register/verify/{confirmationCode}', ['as' => 'confirmation_path', 'uses' => 'PageController@confirm']);
// Console.log
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
