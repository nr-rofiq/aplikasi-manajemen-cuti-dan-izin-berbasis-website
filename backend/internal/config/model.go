package config

// Config koneksi ke database
type Config struct {
	Server   Server
	Database Database
	Jwt      Jwt
}

// Konfigurasi Server
type Server struct {
	Host string
	Port string
}

type Jwt struct {
	Key string
	Exp int
}

// Konfigurasi Database
type Database struct {
	Host string
	Port string
	Name string
	User string
	Pass string
}
