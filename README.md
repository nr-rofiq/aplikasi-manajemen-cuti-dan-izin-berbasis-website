# 🏖️ Aplikasi Manajemen Cuti dan Izin Berbasis Website

Aplikasi yang mempermudah pegawai dan atasan untuk pengajuan maupun persetujuan cuti

## 🧑‍💻 Tim Invacatio

Daftar Anggota:
1. **Nur Rofiq**                ->  Backend Developer
2. **Aqsal Ramadhan Arrijal**   ->  Dokumenter / Tester
3. **Eko Khafid Firmansyah**    ->  Frontend Developer (Web)
4. **Ibnu Khotamul Aulad**      ->  UI/UX Designer
5. **Ardi Perdana Sukma**       ->  Business Analyst

Mentor:
1. Ardhani Reswari Yudistari
2. Dhevatriya Nurul Khasanah


## 🚀 Fitur Utama

✅ **Autentikasi & Otorisasi** – Login dan logout menggunakan JWT.  
✅ **Manajemen Cuti** – Pengajuan, persetujuan, dan riwayat cuti.  
✅ **Role-Based Access** – Hak akses berbeda untuk pegawai dan atasan/PPK.  
✅ **Dashboard Interaktif** – Ringkasan data cuti dengan UI menarik.  

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React.js, Vite, Tailwind CSS, TypeScript  
- **Backend:** Golang, Fiber  
- **Database:** MySQL  
- **Autentikasi:** JWT (JSON Web Token)  

## 📌 Cara Instalasi dan Menjalankan
### 1️⃣ Clone Repositori
```sh
git clone https://github.com/nr-rofiq/aplikasi-manajemen-cuti-dan-izin-berbasis-website.git
cd aplikasi-manajemen-cuti-dan-izin-berbasis-website
```

### 2️⃣ Menjalankan Backend
1. Install Dependency, pastikan PC/Laptop sudah terinstal [Go](https://go.dev/) (minimal versi 1.18). Kemudian jalankan:
```sh
cd backend
go mod tidy
```

2. Konfigurasi Database, pastikan [MySQL](https://www.mysql.com/) sudah terinstall dan jalankan MySQL server. Lalu buat database seperti berikut:
```sh
mysql -u root -p
CREATE DATABASE project_it_bpkp;
exit;
```

3. Import file backup.sql ke MySQL
```sh
mysql -u root -p project_it_bpkp < backup.sql
```

4. Sesuaikan file konfigurasi .env:
```sh
SERVER_HOST=localhost
SERVER_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=project_it_bpkp
DB_USER=root
DB_PASS=root

JWT_KEY=secret
JWT_EXP=10

```

5. Jalankan Server
```sh
go run main.go
```
Server akan berjalan di `http://localhost:3000`

### 3️⃣ Menjalankan Frontend
Untuk Setup Frontend, silakan lihat file README.md di folder frontend


## 🔥 Dokumentasi API
Silakan lihat dokumentasi API di folder backend/openapi/



