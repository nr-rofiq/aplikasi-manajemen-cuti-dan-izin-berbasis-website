package dto

type LoginRequest struct {
	NIP      string `json:"nip"`
	Password string `json:"password"`
}

type CutiRequest struct {
	NipUser     string `json:"-"`
	IDJenisCuti string `json:"id_jenis_cuti" validate:"required"`
	StartDate   string `json:"start_date" validate:"required"`
	EndDate     string `json:"end_date" validate:"required"`
	Alasan      string `json:"alasan"`
}

type UpdateApprovalRequest struct {
	ID            int    `json:"-"`
	Status        string `json:"status" validate:"required"`
	AlasanDitolak string `json:"alasan_ditolak"`
}
