"use client";

import axios from "axios";
import React, { useState } from "react";

export default function AddPage() {
  // buat state untuk untuk setiap komponen
  const [getNo, setNo] = useState("");
  const [getNama, setNama] = useState("");
  const [getJenis, setJenis] = useState("");
  const [getDeskripsi, setDeskripsi] = useState("");

  // buat arrow function untuk "setPost"
  const setPost = () => {
    // jika ada salah satu komponen tidak diisi
    if (getNo == "" || getNama == "" || getJenis == "" || getDeskripsi == "") {
      alert("Seluruh Data Wajib Diisi !");
    }
    // jika semua komponen diisi
    else {
      // kirim ke service "POST" backend
      // process.env.API diambil dari file "next.config.mjs"
      axios
        .post(`${process.env.API}/save`, {
          no: getNo,
          nama: getNama,
          jenis: getJenis,
          deskripsi: getDeskripsi,
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "error" = 0
          if (response.data.error == 0) {
            // panggil fungsi "setRefresh"
            setRefresh();
          }
        });
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
          <label htmlFor="txt_no">No</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
            id="txt_no"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Data No"
            onChange={(e) => setNo(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_nama">Nama Hewan laut</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
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
          <label htmlFor="cbo_jenis">Jenis</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <select
            name=""
            id="cbo_jenis"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500 bg-white"
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="">Pilih Jenis Hewan Laut</option>
            <option value="Air Asin">Ikan Air Asin</option>
            <option value="Air Tawar">Ikan Air Tawar</option>
            <option value="Air Payau">Ikan Air Payau</option>
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

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
            id="txt_deskripsi"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Deskripsi"
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </section>
      </section>



      {/* area komponen */}
      <section className="flex items-center">
        {/* area label */}
        <section className="w-1/4"></section>

        {/* area button */}
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


