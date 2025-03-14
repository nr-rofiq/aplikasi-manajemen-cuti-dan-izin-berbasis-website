package domain

import (
	"backend/dto"
	"context"
)

type Cuti struct {
	ID            int    `db:"id"`
	NipUser       string `db:"nip_user"`
	IDJenisCuti   string `db:"id_jenis_cuti"`
	StartDate     string `db:"start_date"`
	EndDate       string `db:"end_date"`
	Alasan        string `db:"alasan"`
	AlasanDitolak string `db:"alasan_ditolak"`
	Status        string `db:"status"`
	CreatedAt     string `db:"created_at"`
	ApprovedBy    string `db:"approved_by"`
}

type CutiRepository interface {
	FindByNIP(ctx context.Context, nip string) ([]Cuti, error)
	Save(ctx context.Context, u *Cuti) error
}

type CutiService interface {
	Create(ctx context.Context, req dto.CutiRequest) error
	Show(ctx context.Context, nip string) (map[string]any, error)
}
