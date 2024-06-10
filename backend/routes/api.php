<?php

use App\Http\Controllers\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\hewanlaut;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/view', [Hewanlaut::class, 'viewData']);
Route::get('/search/{keyword}', [Hewanlaut::class, 'searchData']);
Route::post('/save', [Hewanlaut::class, 'saveData']);
Route::delete('/delete/{id}', [Hewanlaut::class, 'deleteData']);
Route::get('/detail/{id}', [Hewanlaut::class, 'detailData']);
Route::put('/edit/{id_lama}', [Hewanlaut::class, 'editData']);
Route::get('/show/create', [Hewanlaut::class, 'showForm']);
Route::post('/upload/create', [Hewanlaut::class, 'uploadImage']);
