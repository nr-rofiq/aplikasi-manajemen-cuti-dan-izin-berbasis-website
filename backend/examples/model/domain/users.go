package domain

import "time"

type Users struct {
	Id string
	Nama string
	Password string
	Jabatan string
	Tmt	time.Time
}