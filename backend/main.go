package main

import (
	"backend/dto"
	"backend/internal/api"
	"backend/internal/config"
	"backend/internal/connection"
	"backend/internal/repository"
	"backend/internal/service"
	"net/http"

	jwtMid "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
)

func main() {

	// Mengambil konfigurasi
	cnf := config.Get()
	dbConnection := connection.GetDatabase(cnf.Database)

	app := fiber.New()

	jwtMidd := jwtMid.New(jwtMid.Config{
		SigningKey: jwtMid.SigningKey{Key: []byte(cnf.Jwt.Key)},
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			return ctx.Status(http.StatusUnauthorized).JSON(dto.CreateResponseError("endpoint perlu token, silahkan login dulu"))
		},
	})

	userRepository := repository.NewUser(dbConnection)
	userService := service.NewUser(userRepository)
	api.NewUser(app, userService, jwtMidd)

	authService := service.NewAuth(cnf, userRepository)
	api.NewAuth(app, authService)

	// Routing
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Invacatio RESTful API")
	})

	err := app.Listen(cnf.Server.Host + ":" + cnf.Server.Port)
	if err != nil {
		panic(err)
	}

	// Paused Part 9
}

// SQL
// SHOW TABLES;

// CREATE TABLE users
// (
// 	nip CHAR(18) NOT NULL PRIMARY KEY,
// 	nama VARCHAR(100) NOT NULL,
// 	password CHAR(60) NOT NULL,
// 	jabatan VARCHAR(50) NOT NULL,
// 	tmt DATE NOT NULL
// );

// DESC users;

// INSERT INTO users(nip, nama, password, jabatan, tmt)
// VALUES ('200208152025041001', 'Nur Rofiq', 'bpkp2025', 'Auditor Terampil', '2025-04-01'),
// 		('200011282025041001', 'Aqsal Ramadhan Arrijal', 'bpkp2025', 'Auditor Terampil', '2025-04-01'),
// 		('200103272025041001', 'Eko Khafid Firmansyah', 'bpkp2025', 'Auditor Terampil', '2025-04-01'),
// 		('199106062025041001', 'Ibnu Khotamul Aulad', 'bpkp2025', 'Auditor Terampil', '2025-04-01'),
// 		('199007232025041001', 'Ardi Perdana Sukma', 'bpkp2025', 'Auditor Terampil', '2025-04-01'),
// 		('555566665555666656', 'Kak Yudistari', 'bpkp2025', 'Mentor', '2023-08-10');

// SELECT * FROM users;

// DELETE FROM users;

// CREATE TABLE jenis_cuti
// (
// 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
// 	nama VARCHAR(100) NOT NULL,
// 	durasi_cuti SMALLINT UNSIGNED
// );

// DESC jenis_cuti;

// DROP TABLE jenis_cuti;

// CREATE TABLE cuti
// (
// 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
// 	nip_users CHAR(18) NOT NULL,
// 	id_jenis_cuti INT NOT NULL,
// 	tanggal_mulai DATE NOT NULL,
// 	tanggal_selesai DATE NOT NULL,
// 	alasan VARCHAR(255),
// 	status VARCHAR(20) NOT NULL,
// 	CONSTRAINT fk_cuti_users FOREIGN KEY (nip_users) REFERENCES users(nip),
// 	CONSTRAINT fk_cuti_jenis_cuti FOREIGN KEY (id_jenis_cuti) REFERENCES jenis_cuti(id)
// );

// DESC cuti;
