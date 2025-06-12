# Proyek Next.js

Proyek ini dibuat menggunakan [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Memulai Proyek

Untuk menjalankan server pengembangan, jalankan perintah berikut:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di peramban Anda untuk melihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi file `app/page.tsx`. Halaman akan diperbarui secara otomatis ketika Anda menyimpan perubahan.

Proyek ini menggunakan [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) untuk mengoptimalkan dan memuat font [Geist](https://vercel.com/font), keluarga font baru dari Vercel.

## Variabel Lingkungan

Untuk menjalankan proyek ini, Anda perlu membuat file `.env` di direktori root proyek. File ini digunakan untuk menyimpan kredensial database Anda secara aman.

### Contoh isi file `.env`

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=reservasi_hotel
```

Silakan ganti nilainya sesuai dengan konfigurasi database MySQL Anda.

### Cara Membuat dan Mengisi File `.env`

1. Di root proyek, buat file baru bernama `.env`.
2. Salin dan tempel konfigurasi di atas ke dalam file tersebut.
3. Sesuaikan nilai `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, dan `MYSQL_DATABASE` sesuai dengan pengaturan server database Anda.
4. Pastikan Anda sudah memiliki database dengan nama yang sesuai (`reservasi_hotel` secara default) di MySQL Anda.

## Pelajari Lebih Lanjut

Untuk mempelajari lebih lanjut tentang Next.js, lihat sumber-sumber berikut:

* [Dokumentasi Next.js](https://nextjs.org/docs) – pelajari fitur dan API dari Next.js.
* [Tutorial Interaktif Next.js](https://nextjs.org/learn) – belajar Next.js secara langsung dan interaktif.

Anda juga dapat mengunjungi [repositori GitHub Next.js](https://github.com/vercel/next.js) – masukan dan kontribusi Anda sangat dihargai!