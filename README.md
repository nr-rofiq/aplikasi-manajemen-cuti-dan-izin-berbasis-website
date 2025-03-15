# 🏖️ Aplikasi Manajemen Cuti dan Izin Berbasis Website

Aplikasi yang mempermudah pegawai dan atasan untuk pengajuan maupun persetujuan cuti

## 🧑‍💻 Tim Invacatio

Daftar Anggota:
1. Nur Rofiq                ->  Backend Developer
2. Aqsal Ramadhan Arrijal   ->  Dokumenter / Tester
3. Eko Khafid Firmansyah    ->  Frontend Developer (Web)
4. Ibnu Khotamul Aulad      ->  UI/UX Designer
5. Ardi Perdana Sukma       ->  Business Analyst

Mentor:
1. Ardhani Reswari Yudistari
2. Dhevatriya Nurul Khasanah


## 🚀 Fitur Utama

✅ **Autentikasi & Otorisasi** – Login dan logout menggunakan JWT.  
✅ **Manajemen Cuti** – Pengajuan, persetujuan, dan riwayat cuti.  
✅ **Role-Based Access** – Hak akses berbeda untuk karyawan dan manajer.  
✅ **Dashboard Interaktif** – Ringkasan data cuti dengan UI menarik.  

# Instalasi Project
1. Clone Repository
```
git clone https://github.com/nr-rofiq/aplikasi-manajemen-cuti-dan-izin-berbasis-website.git
cd aplikasi-manajemen-cuti-dan-izin-berbasis-website
```

# Setup Backend
1. Install Dependency, pastikan PC/Laptop sudah terinstal Go (minimal versi 1.18). Kemudian jalankan:
```
cd backend
go mod tidy
```

2. Konfigurasi Database, pastikan MySQL sudah terinstall dan jalankan MySQL server. Lalu buat database seperti berikut:
```
mysql -u root -p
CREATE DATABASE project_it_bpkp;
exit;
```

3. Import file backup.sql ke MySQL
```
mysql -u root -p project_it_bpkp < backup.sql
```

4. Sesuaikan file konfigurasi .env:
```
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
```
go run main.go
```
Server akan berjalan di http://localhost:3000

# Setup Frontend
Untuk Setup Frontend, silakan lihat file README.md di folder frontend


# Dokumentasi API
Silakan lihat dokumentasi API di folder backend/openapi/



