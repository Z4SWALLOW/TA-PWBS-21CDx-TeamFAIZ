<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HHewanlaut extends Model
{
    // Tabel yang terkait dengan model
    protected $table = 'hewanlauts';

    // Kolom-kolom yang dapat diisi secara massal
    protected $fillable = ['id', 'nama', 'jenis', 'deskripsi', 'gambar'];

    // Fungsi untuk menampilkan data hewan laut
    public function viewData()
    {
        $query = $this->select("id AS id_hewanlaut", "id AS id_hewanlaut", "nama AS nama_hewanlaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut", "gambar AS gambar_hewanlaut")->from($this->table)->orderBy("id");

        return $query->get();
    }

    // Fungsi untuk menyimpan data beserta gambar
    public function searchData($keyword)
    {
        $query = $this->select("id AS id_hewanlaut", "id AS id_hewanlaut", "nama AS nama_hewnalaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut", "gambar AS gambar_hewanlaut")->from($this->table)
            // pencarian npm, telepon dan jurusan harus sesuai dengan data
            ->where('id', $keyword)
            ->orWhere('jenis', $keyword)
            ->orWhere('deskripsi', $keyword)
            // pencarian nama sesuai dengan karakter yang ada pada data
            ->orWhereRaw('nama LIKE ?', ["%$keyword%"])
            ->orderBy("id");

        return $query->get();
    }

    function checkSaveData($id)
    {
        $query = $this->select("id")->from($this->table)->where("id", "=", $id);

        return $query->get();
    }

    public function saveData($gambar, $id, $nama, $jenis, $deskripsi)
    {
        // Menyimpan file gambar ke dalam folder 'gambar-hewanlaut' dan mengembalikan path-nya
        $path = Storage::putFile('gambar-hewanlaut', $gambar);

        // Menyimpan data ke dalam tabel dengan menggunakan method create
        return $this->create([
            'id' => $id,
            'nama' => $nama,
            'jenis' => $jenis,
            'deskripsi' => $deskripsi,
            'gambar' => $path,
        ]);
    }

    function checkData($id)
    {
        // $query = $this->select("id")->where("id", "=", $id);
        $query = $this->select("id")
        ->whereRaw("TO_BASE64(id) = '$id'");

        return $query->get();
    }

    // Fungsi untuk menghapus data beserta gambar
    public function deleteData($id)
    {
        $data = $this->where('id', $id)->first();
        if ($data) {
            Storage::delete($data->gambar);
            $data->delete();
        }
    }

    function detailData($id)
    {
        $query = $this->select("id AS id_hewanlaut", "npm AS npm_hewanlaut", "nama AS nama_hewnalaut", "jenis AS jenis_hewanlaut", "deskripsi AS deskripsi_hewanlaut", "gambar AS gambar_hewanlaut")->from($this->table)->whereRaw("TO_BASE64(id) = '$id'");

        return $query->get();
    }

    // Fungsi untuk mengedit data beserta gambar
    public function editData($id, $nama, $jenis, $deskripsi, $gambar, $id_lama)
    {
        $data = $this->where('id', $id_lama)->first();
        if ($data) {
            Storage::delete($data->gambar);
            $path = Storage::putFile('gambar-hewanlaut', $gambar);
            $data->update([
                'id' => $id,
                'nama' => $nama,
                'jenis' => $jenis,
                'deskripsi' => $deskripsi,
                'gambar' => $path,
            ]);
        }
    }
}
