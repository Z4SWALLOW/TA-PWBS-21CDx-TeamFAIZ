import React from "react";
import type { Metadata } from "next";
import EditPage from "./page";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Ubah Data Hewan Laut",
=======
  title: "Ubah Data Mahasiswa",
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
};

export default function EditLayout({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* panggil file "page" (folder "edit/[id]") */}
      <EditPage
        params={{
          id: params.id,
        }}
      />
    </div>
  );
}
