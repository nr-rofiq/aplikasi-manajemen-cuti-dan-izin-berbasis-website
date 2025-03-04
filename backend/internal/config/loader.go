package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// loader untuk mengambil file config
func Get() *Config {
	err := godotenv.Load() // Load file .env

	if err != nil {
		log.Fatal("error when loading file configuration: ", err.Error())
	}

	return &Config{
		Server: Server{
			Host: os.Getenv("SERVER_HOST"),
			Port: os.Getenv("SERVER_PORT"),
		},
		Database: Database{
			Host: os.Getenv("DB_HOST"),
			Port: os.Getenv("DB_PORT"),
			User: os.Getenv("DB_USER"),
			Pass: os.Getenv("DB_PASS"),
			Name: os.Getenv("DB_NAME"),
		},
	}
}
