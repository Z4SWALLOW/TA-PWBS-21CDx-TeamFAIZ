<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class MMahasiswa extends Model
{
    // buat variabel untuk inisialisasi tabel
    protected $table = "tb_mahasiswa";

    // buat fungsi untuk menampilkan data mahasiswa
    function viewData()
    {
        $query = $this->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")->from($this->table)->orderBy("id");

        return $query->get();
    }

    // buat fungsi untuk pencarian data mahasiswa
    function searchData($keyword)
    {
        $query = $this->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")->from($this->table)
        // pencarian npm, telepon dan jurusan harus sesuai dengan data
        ->where('npm', $keyword)
        ->orWhere('telepon', $keyword)
        ->orWhere('jurusan', $keyword)
        // pencarian nama sesuai dengan karakter yang ada pada data
        ->orWhereRaw('nama LIKE ?',["%$keyword%"])
        ->orderBy("id");

        return $query->get();
    }

    // buat fungsi untuk cek simpan data
    function checkSaveData($npm)
    {
        $query = $this->select("npm")->from($this->table)->where("npm", "=", $npm);

        return $query->get();
    }

    // buat fungsi untuk simpan data
    function saveData($npm, $nama, $telepon, $jurusan)
    {
        $this->insert([
            "npm" => $npm,
            "nama" => $nama,
            "telepon" => $telepon,
            "jurusan" => $jurusan,
        ]);
    }

    // buat fungsi untuk check data (berdasarkan npm)
    function checkData($npm)
    {
        // $query = $this->select("id")->where("npm", "=", $npm);
        $query = $this->select("id")
        ->whereRaw("TO_BASE64(npm) = '$npm'");

        return $query->get();
    }

    // buat fungsi untuk hapus data
    function deleteData($npm)
    {
        // $this->where("npm","=",$npm)->delete();
        $this->whereRaw("TO_BASE64(npm) = '$npm'")->delete();
    }

    // buat fungsi untuk detail data
    function detailData($npm)
    {
        $query = $this->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")->from($this->table)->whereRaw("TO_BASE64(npm) = '$npm'");

        return $query->get();
    }

    // buat fungsi untuk cek edit data
    function checkEditData($npm_lama, $npm)
    {
        $query = $this->select("id")->where("npm","=",$npm)->whereRaw("TO_BASE64(npm) != '$npm_lama'")->get();

        return $query;

    }

    // buat fungsi untuk edit data
    function editData($npm, $nama, $telepon, $jurusan, $npm_lama)
    {
        $this->whereRaw("TO_BASE64(npm) = '$npm_lama'")->update([
            "npm" => $npm,
            "nama" => $nama,
            "telepon" => $telepon,
            "jurusan" => $jurusan,
        ]);

        // $this->insert([
        //     "npm" => $npm,
        //     "nama" => $nama,
        //     "telepon" => $telepon,
        //     "jurusan" => $jurusan,
        // ]);
    }
}
