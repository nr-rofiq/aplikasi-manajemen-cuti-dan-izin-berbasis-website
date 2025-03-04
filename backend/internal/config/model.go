package config

// Config koneksi ke database
type Config struct {
	Server   Server
	Database Database
}

// Konfigurasi Server
type Server struct {
	Host string
	Port string
}

// Konfigurasi Database
type Database struct {
	Host string
	Port string
	Name string
	User string
	Pass string
}

