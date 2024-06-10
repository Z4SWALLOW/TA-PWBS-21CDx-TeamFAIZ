/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

// buat fungsi untuk fetchData
const fetchData = (url: string) =>
  fetch(url).then((response) => response.json());

export default function ViewPage() {
  // buat state awal
  const [search, setSearch] = useState("");

  // buat fungsi untuk pencarian
  const searchData = (e: any) => {
    e.preventDefault();

    // isi nilai result dari text cari yang diisi
    const result = e.target[0].value;
    // isi nilai state "setSearch"
    setSearch(result);
  };

  // buat variabel object
  // process.env.API diambil dari file "next.config.mjs"
  const { data, mutate } = useSWR(
    search === ""
      ? `${process.env.API}/view`
      : `${process.env.API}/search/${search}`,
    fetchData
  );

  // buat fungsi untuk hapus data
  const setDelete = (id: string, nama: string) => {
    // alert(`Data Mahasiswa : ${nama} Ingin Dihapus ?`);

    // konfirmasi hapus data
    // jika tombol "Ok" dipilih
    if (confirm(`Data Hewanlaut : ${nama} Ingin Dihapus ?`) == true) {
      // buat variabel untuk hash "no"
      let id_hash = btoa(id);
      // ambil service "delete" dari service
      fetch(`${process.env.API}/delete/${id_hash}`, {
        method: "DELETE",
      })
        // response (format json)
        .then((response) => response.json())
        // result (hasil dari "response")
        .then((result) => {
          alert(result.message);
          // refresh data
          mutate(data);
        })
        // jika proses "fetch" bermasalah
        .catch(() => console.error("Data Gagal Dikirim !"));
    }
  };

  let data_number = 1

  return (

    <div>
      {/* area menu */}
      <nav className="flex justify-center mb-5">
        <Link
          href={"/add"}
          className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
        >
          Tambah Data
        </Link>
        <a
          href={"/"}
          className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
        >
          Refresh Data
        </a>
      </nav>

      {/* area pencarian data */}
      <form action="" onSubmit={searchData}>
        <section>
          <input
            type="text"
            name=""
            id=""
            placeholder="Cari Data Hewan Laut ( Nama Hewan Laut)"
            className="mr-4 border-2 border-slate-300 px-3 py-2 w-2/5 rounded-lg outline-none focus:border-sky-500"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button className="bg-sky-500 border-2 border-sky-500 px-3 py-2 w-40 rounded-lg text-white">
            Cari Data
          </button>
        </section>
      </form>

      {/* loading */}

      {/* {!data && (
        <section>
          <section className="flex justify-center">
            <img src="./images/loading.gif" alt="Loading Icon" />
          </section>

          <section className="text-center text-rose-700  flex justify-center">
            Mohon Tunggu...
          </section>
        </section>
      )} */}

      {/* area isi data */}
      <table className="w-full mt-5">
        {/* judul tabel */}
        <thead>
          <tr>
            <th className="w-1/12 border-2 border-slate-300 bg-black text-white h-10 text-center">
              Aksi
            </th>
            <th className="w-1/12 border-2 border-slate-300 bg-black text-white h-10 text-center">
              No
            </th>
            <th className="w-auto border-2 border-slate-300 bg-black text-white h-10 text-center">
              Nama
            </th>
            <th className="w-2/12 border-2 border-slate-300 bg-black text-white h-10 text-center">
              Jenis
            </th>
            <th className="w-auto border-2 border-slate-300 bg-black text-white h-10 text-center">
              Deskripsi
            </th>
            <th className="w-auto border-2 border-slate-300 bg-black text-white h-10 text-center">
              Gambar
            </th>
          </tr>
        </thead>

        {/* isi tabel */}
        <tbody>
         
          {/* tampilkan data mahasiswa dari service getData dalam format object */}

          {
            // jika data tidak ditemukan
            data && data.hewanlaut.length == 0 ? (
              // {/* kondisi ketika data tidak ditemukan */}
              <tr>
                <td
                  colSpan={6}
                  className="border-2 border-slate-300 bg-white text-black h-8 text-center p-1"
                >
                  Data Tidak Ditemukan !
                </td>
              </tr>
            ) : (

              // isi nilai data dan lakukan pengambilan data
              data &&
              data.hewanlaut.map((item: any) => (
                <tr key={item.id_hewanlaut}>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center p-3">
                    <Link
                      href={`/edit/${btoa(item.id_hewanlaut)}`}
                      className="bg-sky-700 text-white px-3 py-2 rounded-md mr-1"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    <Link
                      href={"/"}
                      className="bg-rose-700 text-white px-3 py-2 rounded-md ml-1"
                      onClick={(e) =>
                        setDelete(item.id_hewanlaut, item.nama_hewanlaut)
                      }
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Link>
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.id_hewanlaut}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.nama_hewanlaut}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.jenis_hewanlaut}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.deskripsi_hewanlaut}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-justify">
                    {item.gambar_hewanlaut}
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
}
