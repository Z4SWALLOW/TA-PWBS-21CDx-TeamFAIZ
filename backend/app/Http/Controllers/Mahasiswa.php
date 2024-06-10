<?php

namespace App\Http\Controllers;

use App\Models\MMahasiswa;
use Illuminate\Http\Request;

class Mahasiswa extends Controller
{
    // buat inisialisasi untuk pengambilan model
    protected $model;

    // buat konstruktor
    function __construct()
    {
        // isi nilai variabel "$model" 
        $this->model = new MMahasiswa();
    }

    // buat fungsi untuk tambah data
    function viewData()
    {
        // jika data mahasiswa tidak ada
        if (count($this->model->viewData()) == 0) {
            $data = [];
            $error = 1;
            $message = "Data Mahasiswa Tidak Ditemukan !";
        }
        // jika data mahasiswa ada / tersedia
        else {
            // ambil method "viewData" dari model "MMhasiswa"
            $data = $this->model->viewData();
            $error = 0;
            $message = "";
        }

        return response(["mahasiswa" => $data, "error" => $error, "message" => $message], http_response_code());
    }

    // buat fungsi untuk pencarian data
    function searchData($keyword)
    {
        // isi nilai variabel "data" dari fungsi "searchData" dari model "MMahasiswa" sesuai dengan isi parameter "keyword"
        $data = $this->model->searchData($keyword);

        // kembalikan nilai variabel "result" ke dalam object "mahasiswa"
        return response(["mahasiswa" => $data], http_response_code());
    }

    // buat fungsi untuk tambah data
    function saveData(Request $req)
    {
        // ambil data npm
        $npm = $req->npm;

        // jika npm sudah ada
        if (count($this->model->checkSaveData($npm)) != 0) {
            $error = 1;
            $message = "Data Gagal Disimpan (NPM Sudah Terpakai !)";
        }
        // jika npm belum ada
        else {
            // ambil request
            $nama = $req->nama;
            $telepon = $req->telepon;
            $jurusan = $req->jurusan;

            // proses simpan data
            $this->model->saveData($npm, $nama, $telepon, $jurusan);

            $error = 0;
            $message = "Data Berhasil Disimpan";
        }

        return response(["error" => $error, "message" => $message], http_response_code());
    }

    // buat fungsi hapus data
    function deleteData($npm)
    {
        // cek apakah data mahasiswa (npm) tersedia/tidak pada model checkData
        // jika data tersedia
        if (count($this->model->checkData($npm)) == 1) {
            // panggil model "deleteData"
            $this->model->deleteData($npm);

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

    // buat fungsi untuk detail data
    function detailData($npm)
    {
        // isi nilai variabel "result" dari fungsi "detailData" dari model "Mmahasiswa" sesuai dengan isi parameter "id"
        $data = $this->model->detailData($npm);

        // kembalikan nilai variabel "result" ke dalam object "mahasiswa"
        return response(["mahasiswa" => $data], http_response_code());
    }

    // buat fungsi untuk edit data
    function editData($npm_lama, Request $req)
    {
        // ambil data npm
        $npm = $req->npm;



        // cek apakah data mahasiswa (npm) tersedia/tidak pada model checkEditData
        // jika data tersedia
        if (count($this->model->checkEditData($npm_lama, $npm)) == 0) {
            $nama = $req->nama;
            $telepon = $req->telepon;
            $jurusan = $req->jurusan;

            // panggil model "editData"
            $this->model->editData($npm, $nama, $telepon, $jurusan, $npm_lama);

            $error = 0;
            $message = "Data Berhasil Diubah";
        }
        // jika data tidak tersedia
        else {
            $error = 1;
            $message = "Data Gagal Diubah (NPM Sudah Terpakai !)";
        }



        return response(["error" => $error, "message" => $message], http_response_code());
    }
}
