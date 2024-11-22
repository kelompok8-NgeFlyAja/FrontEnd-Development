## Instruksi Instalasi
1. **Clone Repository**
   Salin atau clone repository berikut dengan perintah dibawah:

   ```bash
   git clone https://github.com/kelompok8-NgeFlyAja/FrontEnd-Development
   ```

2. **Pindah ke Direktori**
   Bukalah direktori projek yang baru saja anda clone:

   ```bash
   cd FrontEnd-Development
   ```

3. **Setup Environment Variables**
   Buatlah file bernama `.env` di root projek dengan mengikuti contoh yang tersedia `.env.example`. Isilah variabel yang kosong, dengan contoh sebagai berikut:

   ```
   VITE_BACKEND_URI=[URL-backend-Anda]
   ```

4. **Install Dependencies**
   Lakukan instalasi untuk dependensi yang diperlukan oleh aplikasi dengan menggunakan **npm** atau **yarn**:

   ```bash
   npm install
   # atau jika menggunakan yarn
   yarn install
   ```

## Instruksi Menjalankan Aplikasi

5. **Menjalankan Aplikasi**
   Jalankan aplikasi menggunakan Vite:

   ```bash
   npm run dev
   # atau jika menggunakan yarn
   yarn dev
   ```