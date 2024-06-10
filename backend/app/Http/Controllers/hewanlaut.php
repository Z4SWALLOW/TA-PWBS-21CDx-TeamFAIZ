<?php

namespace App\Http\Controllers;

use App\Models\HHewanlaut;
use Illuminate\Http\Request;

class Hewanlaut extends Controller
{
    protected $model;

     function __construct()
    {
        $this->model = new HHewanlaut();
    }

     function viewData()
    {
        if (count($this->model->viewData()) == 0) {
            $data = [];
            $error = 1;
            $message = "Data Hewan Laut Tidak Ditemukan !";
        }
        // jika data mahasiswa ada / tersedia
        else {
            // ambil method "viewData" dari model "MMhasiswa"
            $data = $this->model->viewData();
            $error = 0;
            $message = "";
        }
        return response(["hewanlaut" => $data, "error" => $error, "message" => $message], http_response_code());
    }

    function searchData($keyword)
    {
        $data = $this->model->searchData($keyword);
        return response(["hewanlaut" => $data], http_response_code());
    }

    function saveData(Request $req)
    {
        // ambil data id
        $id = $req->id;

        // jika id sudah ada
        if (count($this->model->checkSaveData($id)) != 0) {
            $error = 1;
            $message = "Data Gagal Disimpan (nomor Sudah Terpakai !)";
        }
        // jika id belum ada
        else {
            // ambil request
            $nama = $req->nama;
            $jenis = $req->jenis;
            $deskripsi = $req->deskrips;
            $gambar = $req->file('image');

            // proses simpan data
            $this->model->saveData($id, $nama, $jenis, $deskripsi, $gambar);

            $error = 0;
            $message = "Data Berhasil Disimpan";
        }

        return response(["error" => $error, "message" => $message], http_response_code());
    }

     function deleteData($id)
    {
        if (count($this->model->checkData($id))== 1) {
            $this->model->deleteData($id);

            $error = 0;
            $message = "Data Berhasil Dihapus";
        }
        // jika data tidak tersedia
        else {
            $error = 1;
            $message = "Data Gagal Dihapus !";
        }
        return response(["error" => $error, "message" => $message], http_response_code());
    }

    
     function detailData($id)
    {
        $data = $this->model->detailData($id);
        return response(["hewanlaut" => $data], http_response_code());
    }

    function editData($id_lama, Request $req)
    {
        // ambil data id
        $id = $req->id;
        // cek apakah data mahasiswa (id) tersedia/tidak pada model checkEditData
        // jika data tersedia
        if (count($this->model->checkEditData($id_lama, $id)) == 0) {
            $nama = $req->nama;
            $jenis = $req->jenis;
            $deskripsi = $req->deskripsi;
            $gambar = $req->file('image');
            // panggil model "editData"
            $this->model->editData($id, $nama, $jenis, $deskripsi, $gambar, $id_lama);
            $error = 0;
            $message = "Data Berhasil Diubah";
        }
        // jika data tidak tersedia
        else {
            $error = 1;
            $message = "Data Gagal Diubah (nomor Sudah Terpakai !)";
        }

        return response(["error" => $error, "message" => $message], http_response_code());
    }

    //  function editData(Request $request, $id_lama)
    // {
    //     $id = $request->input('id');

    //     if ($this->model->checkEditData($id_lama, $id)->isNotEmpty()) {
    //         return response(["error" => 1, "message" => "Data Gagal Diubah (Nomor Sudah Terpakai!)"], 200);
    //     }

    //     $this->model->editData(
    //         $id,
    //         $request->input('nama'),
    //         $request->input('jenis'),
    //         $request->input('deskripsi'),
    //         $request->file('gambar'),
    //         $id_lama
    //     );

    //     return response(["error" => 0, "message" => "Data Berhasil Diubah"], 200);
    // }

     function showForm()
    {
        return view('hewanlaut.form');
    }

     function uploadImage(Request $request)
    {
        $this->validate($request, [
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = $request->file('gambar')->store('gambar-hewanlaut');

        return response()->json(['path' => $path], http_response_code());
    }
}
