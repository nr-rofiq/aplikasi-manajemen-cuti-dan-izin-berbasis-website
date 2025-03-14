# Aplikasi Manajemen Cuti dan Izin Berbasis Website

Project IT CPNS BPKP T.A. 2024

Daftar Anggota:
1. Nur Rofiq                ->  Backend Developer
2. Aqsal Ramadhan Arrijal   ->  Dokumenter / Tester
3. Eko Khafid Firmansyah    ->  Frontend Developer (Web)
4. Ibnu Khotamul Aulad      ->  UI/UX Designer
5. Ardi Perdana Sukma       ->  Business Analyst

Mentor:
1. Ardhani Reswari Yudistari
2. Dhevatriya Nurul Khasanah

# Instalasi Project
1. Clone Repository
```
git clone https://github.com/nr-rofiq/aplikasi-manajemen-cuti-dan-izin-berbasis-website.git
cd aplikasi-manajemen-cuti-dan-izin-berbasis-website
```

2. Setup Backend
a. Install Dependency
Pastikan PC/Laptop sudah terinstal Go (minimal versi 1.18). Kemudian jalankan:
```
cd backend
go mod tidy
```

b. Konfigurasi Database
Pastikan MySQL sudah terinstall dan jalankan MySQL server. Sesuaikan file konfigurasi .env & buat table seperti di file sql.txt:

c. Jalankan Server
```
go run main.go
```




