package repository

import (
	"backend/domain"
	"context"
	"database/sql"
)

type approvalRepository struct {
	db *sql.DB
}

func NewApproval(con *sql.DB) domain.ApprovalRepository {
	return &approvalRepository{
		db: con,
	}
}

// FindAll implements domain.ApprovalRepository.
func (ar *approvalRepository) FindAll(ctx context.Context) ([]domain.Cuti, error) {
	script := "SELECT * FROM cuti LIMIT 5"
	rows, err := ar.db.QueryContext(ctx, script)
	if err != nil {
		// log.Fatal("Query FindAll gagal: ", err.Error())
		return nil, err
	}
	defer rows.Close()

	var cutis []domain.Cuti

	for rows.Next() {
		cuti := domain.Cuti{}
		err := rows.Scan(&cuti.ID, &cuti.NipUser, &cuti.IDJenisCuti, &cuti.StartDate, &cuti.EndDate, &cuti.AlasanCuti, &cuti.AlasanDitolak, &cuti.Status, &cuti.CreatedAt, &cuti.ApprovedBy)
		if err != nil {
			panic(err)
		}

		cutis = append(cutis, cuti)
	}

	return cutis, nil
}

// FindUserByNIP implements domain.ApprovalRepository.
func (ar *approvalRepository) FindUserByNIP(ctx context.Context, nip string) (string, error) {
	script := "SELECT nama FROM user WHERE nip = ?"
	rows, err := ar.db.QueryContext(ctx, script, nip)
	if err != nil {
		// log.Fatal("Query FindAll gagal: ", err.Error())
		return "", err
	}
	defer rows.Close()

	var nama string

	if rows.Next() {
		err := rows.Scan(&nama)
		if err != nil {
			panic(err)
		}

		return nama, nil
	}

	return nama, nil
}

// FindById implements domain.ApprovalRepository.
func (ar *approvalRepository) FindById(ctx context.Context, id int) (domain.Cuti, error) {
	script := "SELECT * FROM cuti WHERE id = ?"
	rows, err := ar.db.QueryContext(ctx, script, id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	cuti := domain.Cuti{}
	if rows.Next() {
		err := rows.Scan(
			&cuti.ID,
			&cuti.NipUser,
			&cuti.IDJenisCuti,
			&cuti.StartDate,
			&cuti.EndDate,
			&cuti.AlasanCuti,
			&cuti.AlasanDitolak,
			&cuti.Status,
			&cuti.CreatedAt,
			&cuti.ApprovedBy,
		)
		if err != nil {
			panic(err)
		}

		return cuti, nil
	} 
	// else {
	// 	return user, errors.New("user is not found")
	// }

	return cuti, nil
}

// Update implements domain.ApprovalRepository.
func (ar *approvalRepository) Update(ctx context.Context, c *domain.Cuti) error {
	script := "UPDATE cuti SET status = ?, alasan_ditolak = ?, approved_by = 'Raden Mas Aris Santosa' WHERE id = ?"
	_, err := ar.db.ExecContext(ctx, script, c.Status, c.AlasanDitolak, c.ID)
	if err != nil {
		return err
	}

	return nil
}
