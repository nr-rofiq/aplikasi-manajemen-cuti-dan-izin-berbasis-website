package repository

// Query SQL
// CRUD

import (
	"backend/domain"
	"context"
	"database/sql"
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

// FindById implements domain.UserRepository.
func (ur *userRepository) FindById(ctx context.Context, id string) (domain.User, error) {
	script := "SELECT * FROM user WHERE nip = ?"
	rows, err := ur.db.QueryContext(ctx, script, id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	user := domain.User{}
	if rows.Next() {
		err := rows.Scan(&user.Nip, &user.Nama, &user.Password, &user.Jabatan, &user.TMT, &user.IsPPK)
		if err != nil {
			panic(err)
		}

		return user, nil
	} 
	// else {
	// 	return user, errors.New("user is not found")
	// }

	return user, nil
}