<?php

namespace App\Http\Controllers;

use App\Models\HHewanlaut;
use Illuminate\Http\Request;

class Hewanlaut extends Controller
{
     // buat inisialisasi untuk pengambilan model
     protected $model;

     // buat konstruktor
     function __construct()
     {
         // isi nilai variabel "$model" 
         $this->model = new HHewanlaut();
     }
 
     // buat fungsi untuk tambah data
     function viewData()
     {
         // jika data mahasiswa tidak ada
         if (count($this->model->viewData()) == 0) {
             $data = [];
             $error = 1;
             $message = "Data Hewan laut Tidak Ditemukan !";
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
 
     // buat fungsi untuk pencarian data
     function searchData($keyword)
     {
         // isi nilai variabel "data" dari fungsi "searchData" dari model "MMahasiswa" sesuai dengan isi parameter "keyword"
         $data = $this->model->searchData($keyword);
 
         // kembalikan nilai variabel "result" ke dalam object "mahasiswa"
         return response(["hewanlaut" => $data], http_response_code());
     }
 
     // buat fungsi untuk tambah data
     // buat fungsi untuk simpan data
   function saveData(Request $req)
   {
       // ambil data npm
       $no = $req->no;

       // jika npm sudah ada
       if (count($this->model->checkSaveData($no)) != 0) {
           $error = 1;
           $message = "Data Gagal Disimpan (Data Sudah Terpakai !)";
       }
       // jika npm belum ada
       else {
           // ambil request
           $nama = $req->nama;
           $jenis = $req->jenis;
           $deskripsi = $req->deskripsi;

           // proses simpan data
           $this->model->saveData($no, $nama, $jenis, $deskripsi);

           $error = 0;
           $message = "Data Berhasil Disimpan";
       }

       return response(["error" => $error, "message" => $message], http_response_code());
   }
     // buat fungsi hapus data
     function deleteData($no)
     {
         // cek apakah data mahasiswa (npm) tersedia/tidak pada model checkData
         // jika data tersedia
         if (count($this->model->checkData($no)) == 1) {
             // panggil model "deleteData"
             $this->model->deleteData($no);
 
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
     function detailData($no)
     {
         // isi nilai variabel "result" dari fungsi "detailData" dari model "Mmahasiswa" sesuai dengan isi parameter "id"
         $data = $this->model->detailData($no);
 
         // kembalikan nilai variabel "result" ke dalam object "mahasiswa"
         return response(["hewanlaut" => $data], http_response_code());
     }
 
     // buat fungsi untuk edit data
     function editData($no_lama, Request $req)
     {
         // ambil data npm
         $no = $req->no;
 
 
 
         // cek apakah data mahasiswa (npm) tersedia/tidak pada model checkEditData
         // jika data tersedia
         if (count($this->model->checkEditData($no_lama, $no)) == 0) {
             $nama = $req->nama;
             $jenis = $req->jenis;
             $deskripsi = $req->deskripsi;
 
             // panggil model "editData"
             $this->model->editData($no, $nama, $jenis, $deskripsi, $no_lama);
 
             $error = 0;
             $message = "Data Berhasil Diubah";
         }
         // jika data tidak tersedia
         else {
             $error = 1;
             $message = "Data Gagal Diubah (no Sudah Terpakai !)";
         }
 
 
 
         return response(["error" => $error, "message" => $message], http_response_code());
     }
 }
 