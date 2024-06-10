<?php

<<<<<<< HEAD
use App\Http\Controllers\Hewanlaut;
use App\Http\Controllers\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

=======
use App\Http\Controllers\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\hewanlaut;
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
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

<<<<<<< HEAD
// route untuk tampil data
Route::get("/view",[Hewanlaut::class,'viewData']);

// route untuk pencarian
Route::get('/search/{keyword}',[Hewanlaut::class,'searchData']);

// route untuk tambah data 
Route::post("/save",[Hewanlaut::class,'saveData']);

// route untuk delete data
Route::delete("/delete/{no}",[Hewanlaut::class,'deleteData']);

// route untuk detail data
Route::get('/detail/{no}',[Hewanlaut::class,'detailData']);

// route untuk edit data
Route::put("/edit/{no}",[Hewanlaut::class,'editData']);
=======

Route::get('/view', [Hewanlaut::class, 'viewData']);
Route::get('/search/{keyword}', [Hewanlaut::class, 'searchData']);
Route::post('/save', [Hewanlaut::class, 'saveData']);
Route::delete('/delete/{id}', [Hewanlaut::class, 'deleteData']);
Route::get('/detail/{id}', [Hewanlaut::class, 'detailData']);
Route::put('/edit/{id_lama}', [Hewanlaut::class, 'editData']);
Route::get('/show/create', [Hewanlaut::class, 'showForm']);
Route::post('/upload/create', [Hewanlaut::class, 'uploadImage']);
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
