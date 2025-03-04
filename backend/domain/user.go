package domain

import (
	"backend/dto"
	"context"
	"time"
)

// Representasi Tabel User
type User struct {
	ID       string    `db:"id"`
	Nama     string    `db:"nama"`
	Password string    `db:"password"`
	Jabatan  string    `db:"jabatan"`
	TMT      time.Time `db:"tmt"`
}

// Interface/kontrak CRUD ke Database
type UserRepository interface {
	FindAll(ctx context.Context) ([]User, error)
	FindById(ctx context.Context, id string) (User, error)
	Save(ctx context.Context, u *User) error
	Update(ctx context.Context, u *User) error
	Delete(ctx context.Context, id string) error
}

// Bikin services utk DTO (kontrak)
type UserService interface {
	Index(ctx context.Context) ([]dto.UserData, error)
}