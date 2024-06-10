<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HHewanlaut extends Model
{
   // buat variabel untuk inisialisasi tabel
   protected $table = "h_hewanlauts";

   // buat fungsi untuk menampilkan data mahasiswa
   function viewData()
   {
       $query = $this->select("id AS id_hewanlaut", "no AS no_hewanlaut", "nama AS nama_hewanlaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut")->from($this->table)->orderBy("id");

       return $query->get();
   }

   // buat fungsi untuk pencarian data mahasiswa
   function searchData($keyword)
   {
       $query = $this->select("id AS id_hewanlaut", "no AS no_hewanlaut", "nama AS nama_hewanlaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut")->from($this->table)
       // pencarian npm, telepon dan jurusan harus sesuai dengan data
       ->where('no', $keyword)
       ->orWhere('jenis', $keyword)
       ->orWhere('deskripsi', $keyword)
       // pencarian nama sesuai dengan karakter yang ada pada data
       ->orWhereRaw('nama LIKE ?',["%$keyword%"])
       ->orderBy("id");

       return $query->get();
   }

   // buat fungsi untuk cek simpan data
   function checkSaveData($no)
   {
       $query = $this->select("no")->from($this->table)->where("no", "=", $no);

       return $query->get();
   }


   public function saveData( $no, $nama, $jenis, $deskripsi)
   {
       // Menyimpan file gambar ke dalam folder 'gambar-hewanlaut' dan mengembalikan path-nya

       // Menyimpan data ke dalam tabel dengan menggunakan method create
       return $this->create([
           'no' => $no,
           'nama' => $nama,
           'jenis' => $jenis,
           'deskripsi' => $deskripsi,
       ]);
   }

   // buat fungsi untuk check data (berdasarkan npm)
   function checkData($no)
   {
       $query = $this->select("id")->where("no", "=", $no);
    //    $query = $this->select("id")
    //    ->whereRaw("TO_BASE64(no) = '$no'");

       return $query->get();
   }

   // buat fungsi untuk hapus data
   function deleteData($no)
   {
       $this->where("no","=",$no)->delete();
    //    $this->whereRaw("TO_BASE64(no) = '$no'")->delete();
   }

   // buat fungsi untuk detail data
   function detailData($no)
   {
       $query = $this->select("id AS id_hewanlaut", "no AS no_hewanlaut", "nama AS nama_hewanlaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut")->from($this->table)->whereRaw("TO_BASE64(no) = '$no'");

       return $query->get();
   }

   // buat fungsi untuk cek edit data
//    function checkEditData($no_lama, $no)
//    {
//        $query = $this->select("id")->where("no","=",$no)->whereRaw("TO_BASE64(npm) != '$no_lama'")->get();

//        return $query;

//    }

   // buat fungsi untuk edit data
   function editData($no, $nama, $jenis, $deskripsi, $no_lama)
   {
    //    $this->whereRaw("TO_BASE64(npm) = '$no_lama'")->update([
    //        "no" => $no,
    //        "nama" => $nama,
    //        "jenis" => $jenis,
    //        "deskripsi" => $deskripsi,
    //    ]);

       $this->insert([
           "no" => $no,
           "nama" => $nama,
           "jenis" => $jenis,
           "deskripsi" => $deskripsi,
       ]);
   }
}