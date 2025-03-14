package domain

import (
	"backend/dto"
	"context"
)

type User struct {
	Nip      string `db:"nip"`
	Nama     string `db:"nama"`
	Password string `db:"password"`
	Jabatan  string `db:"jabatan"`
	TMT      string `db:"tmt"`
	IsPPK    bool `db:"is_ppk"`
}

type UserRepository interface {
	FindById(ctx context.Context, id string) (User, error)
}

type UserService interface {
	Login(ctx context.Context, req dto.LoginRequest) (map[string]any, error) // USED
}
