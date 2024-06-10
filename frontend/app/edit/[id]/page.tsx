"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import useSWR from "swr";

// buat fungsi untuk fetchData
const fetchData = (url: string) =>
  fetch(url).then((response) => response.json());

export default function EditPage({ params }: { params: { id: string } }) {
  // buat variabel object untuk menampilkan detail data
  // process.env.API diambil dari file "next.config.mjs"
  const { data, error } = useSWR(`${process.env.API}/detail/${params.id}`, fetchData);

  // buat hook "useRef" untuk pengambilan nilai setiap komponen
  const ref_nama = useRef<HTMLInputElement>(null);
  const ref_jenis = useRef<HTMLSelectElement>(null);
  const ref_deskripsi = useRef<HTMLInputElement>(null);

  // buat state untuk gambar
  const [getImage, setImage] = useState<File | null>(null);

  // buat arrow function untuk "setPut"
  const setPut = () => {
    // jika ada salah satu komponen tidak diisi
    if (
      ref_nama?.current?.value == "" ||
      ref_jenis?.current?.value == "" ||
      ref_deskripsi?.current?.value == "" ||
      !getImage
    ) {
      alert("Seluruh Data Wajib Diisi !");
    }
    // jika semua komponen diisi
    else {
      // buat FormData untuk mengirim data sebagai multipart/form-data
      const formData = new FormData();
      formData.append("nama", ref_nama.current!.value); // Non-null assertion karena kita sudah cek null di atas
      formData.append("jenis", ref_jenis.current!.value); // Non-null assertion karena kita sudah cek null di atas
      formData.append("deskripsi", ref_deskripsi.current!.value); // Non-null assertion karena kita sudah cek null di atas
      if (getImage) formData.append("image", getImage);

      // kirim ke service "PUT" backend
      axios
        .put(`${process.env.API}/edit/${params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "error" = 0
          if (response.data.error == 0) {
            // refresh halaman dengan URL baru
            let nama_hash: any = ref_nama?.current?.value;
            location.replace(`/edit/${btoa(nama_hash)}`);
          }
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
          if (error.response) {
            console.error("Server responded with status code:", error.response.status);
          }
        });
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
    // reload halaman
    location.reload();
  };

  // jika ada error dalam fetch data
  if (error) return <div>Failed to load data</div>;

  // jika data belum ada
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {
        // jika detail data tidak ditemukan
        data.hewan && data.hewan.length === 0 ? (
          <h1>Data Tidak Ditemukan !</h1>
        ) : (
          // jika detail data ditemukan
          data.hewan && data.hewan.map((item: any, index: number) => (
            <section key={index}>
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
                    placeholder="Isi Data Nama Hewan Laut"
                    defaultValue={item.nama_hewan}
                    ref={ref_nama}
                  />
                </section>
              </section>

              {/* area komponen */}
              <section className="flex items-center mb-4">
                {/* area label */}
                <section className="w-1/4">
                  <label htmlFor="txt_jenis">Jenis Hewan Laut</label>
                </section>

                {/* area input */}
                <section className="w-3/4">
                  <select
                    name=""
                    id="txt_jenis"
                    className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500 bg-white"
                    defaultValue={item.jenis_hewan}
                    ref={ref_jenis}
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

                {/* area input */}
                <section className="w-3/4">
                  <input
                    type="text"
                    name=""
                    id="txt_deskripsi"
                    className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
                    placeholder="Isi Data Deskripsi"
                    defaultValue={item.deskripsi_hewan}
                    ref={ref_deskripsi}
                  />
                </section>
              </section>

              {/* area komponen */}
              <section className="flex items-center mb-4">
                {/* area label */}
                <section className="w-1/4">
                  <label htmlFor="file_gambar">Upload Gambar</label>
                </section>

                {/* area input */}
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
                {/* area label */}
                <section className="w-1/4"></section>

                {/* area button */}
                <section className="w-3/4">
                  <button
                    id="btn_ubah"
                    className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
                    onClick={setPut}
                  >
                    Ubah
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
            </section>
          ))
        )
      }
    </div>
  );
}
