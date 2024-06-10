/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
// Panggil file "style.module.css"
import style from "./styles/style.module.css";

// Panggil file Tailwind
import "tailwindcss/tailwind.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "View Data Hewan Laut",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tambahkan favicon */}
        <link
          rel="shortcut icon"

          type="image/x-icon"
        />
        {/* Tambahkan CDN FontAwesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>
<<<<<<< HEAD
      

      <body className={style.layout}>
      <header className={`${style.header}`}>
=======

      <body className={style.layout}>
        <header className={`${style.header}`}>
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
          <div><h1>WonderfulSea</h1></div>
          <nav>
            <ul className={`${style.navbar}`}>
              <li><a href="beranda">Beranda</a></li>
<<<<<<< HEAD
              <li><a href="/">Tambah Data</a></li>
            </ul>
            <div></div>
          </nav>
        </header>
        <section className={`${style.content} ${style.content_bg}`} style={{ backgroundImage: "url('https://asset-a.grid.id/crop/0x0:0x0/x/photo/2019/02/01/822975623.jpg')" }}>
          {children}
        </section>


=======
              <li><a href="">Tambah Data</a></li>
            </ul>
          </nav>
        </header>

        <section className={`${style.content} ${style.content_bg}`}>
          {children}
        </section>

>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
        <footer className={style.footer}>&copy; 2024 | PWBS - IF 21 CDX</footer>
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
