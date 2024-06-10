"use client";

import axios from "axios";
import React, { useState } from "react";

export default function AddPage() {
  // buat state untuk setiap komponen
  const [getNama, setNama] = useState("");
  const [getJenis, setJenis] = useState("");
  const [getDeskripsi, setDeskripsi] = useState("");
  const [getImage, setImage] = useState<File | null>(null); // Tambahkan state untuk gambar

  // buat arrow function untuk "setPost"
  const setPost = () => {
    // jika ada salah satu komponen tidak diisi
    if (getNama === "" || getJenis === "" || getDeskripsi === "" || !getImage) {
      alert("Seluruh Data Wajib Diisi !");
    } else {
      // kirim ke service "POST" backend
      // process.env.API diambil dari file "next.config.mjs"
      axios
        .post(`${process.env.API}/save/create`, {
          nama: getNama,  
          jenis: getJenis,
          deskripsi: getDeskripsi,
          image: getImage,
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "error" = 0
          if (response.data.error === 0) {
            // panggil fungsi "setRefresh"
            setRefresh();
          }
        })
    }
  };

  // buat arrow function untuk "handleImageChange"
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // buat arrow function untuk "btn_refresh"
  const setRefresh = () => {
    location.reload();
  };

  return (
    <div>
      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_nama">Nama Hewan Laut</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            id="txt_nama"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Data Nama Hewan Laut"
            onChange={(e) => setNama(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_jenis">Jenis Hewan Laut</label>
        </section>
        <section className="w-3/4">
          <select
            id="txt_jenis"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500 bg-white"
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="">Pilih Jenis Hewan Laut</option>
            <option value="Ikan Air Asin">Ikan Air Asin</option>
            <option value="Ikan Air Tawar">Ikan Air Tawar</option>
            <option value="Ikan Air Payau">Ikan Air Payau</option>
            <option value="Terumbu Karang">Terumbu Karang</option>
          </select>
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_deskripsi">Deskripsi</label>
        </section>
        <section className="w-3/4">
          <input
            type="text"
            id="txt_deskripsi"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Deskripsi Hewan Laut"
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen untuk input file gambar */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="file_gambar">Upload Gambar</label>
        </section>
        <section className="w-3/4">
          <input
            type="file"
            id="file_gambar"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            onChange={handleImageChange}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center">
        <section className="w-1/4"></section>
        <section className="w-3/4">
          <button
            id="btn_simpan"
            className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
            onClick={setPost}
          >
            Simpan
          </button>
          <button
            id="btn_refresh"
            className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
            onClick={setRefresh}
          >
            Refresh
          </button>
        </section>
      </section>
    </div>
  );
}
