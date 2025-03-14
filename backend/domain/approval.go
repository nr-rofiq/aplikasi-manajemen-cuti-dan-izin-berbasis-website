package domain

import (
	"backend/dto"
	"context"
)

type ApprovalRepository interface {
	FindAll(ctx context.Context) ([]Cuti, error)
	FindUserByNIP(ctx context.Context, nip string) (string, error)
	FindById(ctx context.Context, id int) (Cuti, error)
	Update(ctx context.Context, c *Cuti) error
}

type ApprovalService interface {
	Show(ctx context.Context) ([]map[string]any, error)
	Update(ctx context.Context, req dto.UpdateApprovalRequest) error
}