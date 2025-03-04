package repository

import (
	"backend/domain"
	"context"
	"database/sql"
	"errors"
)

// Implementasi interface dari "domain >> user.go"
type userRepository struct {
	db *sql.DB
}

// Inisialisasi fungsi
func NewUser(con *sql.DB) domain.UserRepository {
	return &userRepository{
		db: con,
	}
}


// FindAll implements domain.UserRepository.
func (ur *userRepository) FindAll(ctx context.Context) ([]domain.User, error) {
	script := "SELECT * FROM users"
	rows, err := ur.db.QueryContext(ctx, script)
	if err != nil {
		// log.Fatal("Query FindAll gagal: ", err.Error())
		return nil, err
	}
	defer rows.Close()

	var users []domain.User

	for rows.Next() {
		user := domain.User{}
		err = rows.Scan(&user.ID, &user.Nama, &user.Password, &user.Jabatan, &user.TMT)
		if err != nil {
			panic(err)
		}

		users = append(users, user)
	}

	return users, nil
}

// FindById implements domain.UserRepository.
func (ur *userRepository) FindById(ctx context.Context, id string) (domain.User, error) {
	script := "SELECT * FROM users WHERE id = ?"
	rows, err := ur.db.QueryContext(ctx, script)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	user := domain.User{}
	if rows.Next() {
		err := rows.Scan(&user.ID, &user.Nama, &user.Password, &user.Jabatan, &user.TMT)
		if err != nil {
			panic(err)
		}

		return user, nil
	} else {
		return user, errors.New("user is not found")
	}
}

// Save implements domain.UserRepository.
func (ur *userRepository) Save(ctx context.Context, u *domain.User) error {
	script := "INSERT INTO users(id, nama, password, jabatan, tmt) VALUES (?, ?, ?, ?, ?)"
	_, err := ur.db.ExecContext(ctx, script, u.ID, u.Nama, u.Password, u.Jabatan, u.TMT)
	if err != nil {
		return err
	}

	return nil
}

// Update implements domain.UserRepository.
func (ur *userRepository) Update(ctx context.Context, u *domain.User) error {
	script := "UPDATE users SET nama = ? WHERE id = ?"
	_, err := ur.db.ExecContext(ctx, script, u.Nama, u.ID)
	if err != nil {
		return err
	}

	return nil
}

// Delete implements domain.UserRepository.
func (ur *userRepository) Delete(ctx context.Context, id string) error {
	script := "DELETE FROM users WHERE id = ?"
	_, err := ur.db.ExecContext(ctx, script, id)
	if err != nil {
		return err
	}

	return nil
}
