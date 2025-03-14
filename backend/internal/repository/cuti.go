package repository

import (
	"backend/domain"
	"context"
	"database/sql"
)

type cutiRepository struct {
	db *sql.DB
}

func NewCuti(con *sql.DB) domain.CutiRepository {
	return &cutiRepository{
		db: con,
	}
}

// Save implements domain.CutiRepository.
func (cr *cutiRepository) Save(ctx context.Context, c *domain.Cuti) error {
	script := "INSERT INTO cuti(nip_user, id_jenis_cuti, start_date, end_date, alasan) VALUES (?, ?, ?, ?, ?)"
	_, err := cr.db.ExecContext(ctx, script, c.NipUser, c.IDJenisCuti, c.StartDate, c.EndDate, c.Alasan)
	if err != nil {
		return err
	}

	return nil
}

// FindByNIP implements domain.CutiRepository.
func (cr *cutiRepository) FindByNIP(ctx context.Context, nip string) ([]domain.Cuti, error) {
	script := "SELECT id, nip_user, id_jenis_cuti, start_date, end_date, alasan, alasan_ditolak, status, created_at FROM cuti WHERE nip_user = ?"
	rows, err := cr.db.QueryContext(ctx, script, nip)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var cutis []domain.Cuti

	for rows.Next() {
		cuti := domain.Cuti{}
		err := rows.Scan(&cuti.ID, &cuti.NipUser, &cuti.IDJenisCuti, &cuti.StartDate, &cuti.EndDate, &cuti.Alasan, &cuti.AlasanDitolak, &cuti.Status, &cuti.CreatedAt)
		if err != nil {
			panic(err)
		}

		// return cuti, nil
		cutis = append(cutis, cuti)
	} 

	return cutis, nil
}
