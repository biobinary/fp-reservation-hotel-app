This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Untuk menjalankan proyek ini, Anda perlu membuat file `.env` di root direktori proyek. File ini digunakan untuk menyimpan kredensial database Anda secara aman.

### Contoh isi file `.env`

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=reservasi_hotel
```

Gantilah nilai sesuai dengan konfigurasi database MySQL Anda.

### Cara membuat dan mengisi file `.env`

1. Di root proyek, buat file baru bernama `.env`.
2. Salin dan tempel konfigurasi di atas ke dalam file tersebut.
3. Sesuaikan nilai `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, dan `MYSQL_DATABASE` sesuai dengan server database Anda.
4. Pastikan Anda memiliki database dengan nama yang sesuai (`reservasi_hotel` secara default) di MySQL Anda.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
