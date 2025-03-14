package main

import (
	"backend/internal/api"
	"backend/internal/config"
	"backend/internal/connection"
	"backend/internal/repository"
	"backend/internal/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "*",
		AllowHeaders: "*",
	}))

	cnf := config.Get()
	dbConnection := connection.GetDatabase(cnf.Database)

	userRepository := repository.NewUser(dbConnection)
	userService := service.NewUser(cnf, userRepository)
	api.NewUser(app, userService)

	cutiRepository := repository.NewCuti(dbConnection)
	cutiService := service.NewCuti(cnf, cutiRepository)
	api.NewCuti(app, cutiService)

	approvalRepository := repository.NewApproval(dbConnection)
	approvalService := service.NewApproval(cnf, approvalRepository)
	api.NewApproval(app, approvalService)

	// Routing
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Invacatio RESTful API")
	})

	err := app.Listen(cnf.Server.Host + ":" + cnf.Server.Port)
	if err != nil {
		panic(err)
	}
}

// SQL
// SHOW TABLES;

// CREATE TABLE user
// (
// 	nip CHAR(18) NOT NULL PRIMARY KEY,
// 	nama VARCHAR(100) NOT NULL,
// 	password CHAR(60) NOT NULL,
// 	jabatan VARCHAR(50) NOT NULL,
// 	tmt DATE NOT NULL,
//  is_ppk BOOLEAN NOT NULL
// );

// DESC user;

// INSERT INTO user(nip, nama, password, jabatan, tmt, is_ppk)
// VALUES ('200208152025041001', 'Nur Rofiq', 'bpkp2025', 'Auditor Terampil', '2024-04-01', FALSE),
// 		('200011282025041001', 'Aqsal Ramadhan Arrijal', 'bpkp2025', 'Auditor Terampil', '2023-07-01', FALSE),
// 		('200103272025041001', 'Eko Khafid Firmansyah', 'bpkp2025', 'Auditor Terampil', '2021-09-01', FALSE),
// 		('199106062025041001', 'Ibnu Khotamul Aulad', 'bpkp2025', 'Auditor Terampil', '2019-03-01', FALSE),
// 		('199007232025041001', 'Ardi Perdana Sukma', 'bpkp2025', 'Auditor Ahli Pertama', '2017-10-01', FALSE),
// 		('197405271994051017', 'Raden Mas Aris Santosa', 'bpkp2025', 'Kepala Biro SDM', '1994-05-01', TRUE);

// SELECT * FROM user;

// DELETE FROM user;

// CREATE TABLE jenis_cuti
// (
// 	id CHAR(3) NOT NULL PRIMARY KEY,
// 	nama VARCHAR(100) NOT NULL,
// 	max_days SMALLINT UNSIGNED
// );

// DESC jenis_cuti;

// INSERT INTO jenis_cuti(id, nama, max_days)
// VALUES('C01', 'Cuti Tahunan', 12),
//       ('C02', 'Cuti Besar', 90),
//       ('C03', 'Cuti Sakit', NULL),
//       ('C04', 'Cuti Melahirkan', 90),
//       ('C05', 'Cuti Karena Alasan Penting', 30);

// DROP TABLE jenis_cuti;

// CREATE TABLE cuti
// (
// 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
// 	nip_user CHAR(18) NOT NULL,
// 	id_jenis_cuti CHAR(3) NOT NULL,
// 	start_date DATE NOT NULL,
// 	end_date DATE NOT NULL,
// 	alasan VARCHAR(255),
// 	status VARCHAR(20) NOT NULL DEFAULT "Menunggu",
//  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//  updated_at TIMESTAMP,
//  deleted_at TIMESTAMP,
//  approved_by VARCHAR(100),
// 	CONSTRAINT fk_cuti_users FOREIGN KEY (nip_user) REFERENCES user(nip),
// 	CONSTRAINT fk_cuti_jenis_cuti FOREIGN KEY (id_jenis_cuti) REFERENCES jenis_cuti(id)
// );

// INSERT INTO cuti(nip_user, id_jenis_cuti, start_date, end_date, alasan) 
// VALUES ('199007232025041001', 'C01', '2025-03-10', '2025-03-15', 'Liburan bareng keluarga');

// UPDATE cuti SET status = 'Disetujui' WHERE created_at = '2025-03-11 20:31:33';

// SHOW CREATE TABLE cuti;

// ALTER TABLE cuti ADD COLUMN alasan_ditolak VARCHAR(255) AFTER alasan;

// DESC cuti;

// ===== INSERT DATA via POSTMAN =====

// {
//     "nip": "197405271994051017",
//     "nama": "Raden Mas Aris Santosa",
//     "password": "bpkp2025",
//     "jabatan": "Kepala Biro SDM",
//     "tmt": "1994-05-01",
//     "is_ppk": true
// }

// {
//     "nip": "199007232025041001",
//     "nama": "Ardi Perdana Sukma",
//     "password": "bpkp2025",
//     "jabatan": "Auditor Ahli Pertama",
//     "tmt": "2017-10-01",
//     "is_ppk": false
// }

// {
//     "nip": "199106062025041001",
//     "nama": "Ibnu Khotamul Aulad",
//     "password": "bpkp2025",
//     "jabatan": "Auditor Terampil",
//     "tmt": "2019-03-01",
//     "is_ppk": false
// }

// {
//     "nip": "200103272025041001",
//     "nama": "Eko Khafid Firmansyah",
//     "password": "bpkp2025",
//     "jabatan": "Auditor Terampil",
//     "tmt": "2021-09-01",
//     "is_ppk": false
// }

// {
//     "nip": "200011282025041001",
//     "nama": "Aqsal Ramadhan Arrijal",
//     "password": "bpkp2025",
//     "jabatan": "Auditor Terampil",
//     "tmt": "2023-07-01",
//     "is_ppk": false
// }

// {
//     "nip": "200208152025041001",
//     "nama": "Nur Rofiq",
//     "password": "bpkp2025",
//     "jabatan": "Auditor Terampil",
//     "tmt": "2024-04-01",
//     "is_ppk": false
// }

// === Daftar NIP ===
// 1. 200208152025041001
// 2. 200011282025041001
// 3. 200103272025041001
// 4. 199106062025041001
// 5. 199007232025041001
// 6. 197405271994051017

// Default password = bpkp2025

// === ID Jenis Cuti ===
// C01 - Cuti Tahunan
// C02 - Cuti Besar
// C03 - Cuti Sakit
// C04 - Cuti Melahirkan
// C05 - Cuti Karena Alasan Penting 