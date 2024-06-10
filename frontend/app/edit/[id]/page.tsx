"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";

// buat fungsi untuk fetchData
const fetchData = (url: string) =>
  fetch(url).then((response) => response.json());

export default function EditPage({ params }: { params: { id: string } }) {
  // buat variabel object untuk menampilkan detail data
  // process.env.API diambil dari file "next.config.mjs"
  const { data } = useSWR(`${process.env.API}/detail/${params.id}`, fetchData);

  // buat hook "useRef" untuk pengambilan nilai setiap komponen
  const ref_no = useRef<HTMLInputElement>(null);
  const ref_nama = useRef<HTMLInputElement>(null);
  const ref_jenis = useRef<HTMLInputElement>(null);
  const ref_deskripsi = useRef<HTMLSelectElement>(null);

  // buat arrow function untuk "setPut"
  const setPut = () => {
    // jika ada salah satu komponen tidak diisi
    if (
      ref_no?.current?.value == "" ||
      ref_nama?.current?.value == "" ||
      ref_jenis?.current?.value == "" ||
      ref_deskripsi?.current?.value == ""
    ) {
      alert("Seluruh Data Wajib Diisi !");
    }
    // jika semua komponen diisi
    else {
      // kirim ke service "PUT" backend
      axios
        .put(`${process.env.API}/edit/${params.id}`, {
          no: ref_no?.current?.value,
          nama: ref_nama?.current?.value,
          jenis: ref_jenis?.current?.value,
          deskripsi: ref_deskripsi?.current?.value,
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "error" = 0
          if (response.data.error == 0) {
            // refresh halaman dengan URL baru
            let no_hash: any = ref_no?.current?.value;
            location.replace(`/edit/${btoa(no_hash)}`);
          }
        });
    }
  };

  // buat arrow function untuk "btn_refresh"
  const setRefresh = () => {
    // reload halaman
    location.reload();
  };

  return (
    <div>
      {
        // jika detail data tidak ditemukan
        data && data.hewanlaut.length == 0 ? (
          <h1>Data Tidak Ditemukan !</h1>
        ) : (
          // jika detail data ditemukan
          data &&
          data.hewanlaut.map((item: any, index: number) => (
            <section key={index}>
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
                    defaultValue={item.no_hewanlaut}
                    ref={ref_no}
                  />
                </section>
              </section>

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
                    name=""
                    id="txt_nama"
                    className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
                    placeholder="Isi Data Nama Mahasiswa"
                    defaultValue={item.nama_hewanlaut}
                    ref={ref_nama}
                  />
                </section>
              </section>

              {/* area komponen */}
              <section className="flex items-center mb-4">
                {/* area label */}
                <section className="w-1/4">
                  <label htmlFor="txt_deskripsi">Telepon Mahasiswa</label>
                </section>

                {/* area input */}
                <section className="w-3/4">
                  <input
                    type="text"
                    name=""
                    id="txt_deskripsi"
                    className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
                    placeholder="Isi Deskripsi"
                    defaultValue={item.deskripsi_hewanlaut}
                    ref={ref_deskripsi}
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
                    defaultValue={item.jenis_hewanlaut}
                    ref={ref_jenis}>
                    <option value="">Pilih Jenis Hewan Laut</option>
                    <option value="Air Asin">Ikan Air Asin</option>
                    <option value="Air Tawar">Ikan Air Tawar</option>
                    <option value="Air Payau">Ikan Air Payau</option>
                    <option value="Terumbu Karang">Terumbu Karang</option>
                  </select>
                </section>
              </section>

              {/* area komponen */}
              <section className="flex items-center">
                {/* area label */}
                <section className="w-1/4"></section>

                {/* area button */}
                <section className="w-3/4">
                  <button
                    id="btn_ubah"
                    className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
                    onClick={setPut}>
                    Ubah
                  </button>

                  <button
                    id="btn_refresh"
                    className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
                    onClick={setRefresh}>
                    Refresh
                  </button>
                </section>
              </section>
            </section>
          ))
        )
      }
    </div>
  );
}
