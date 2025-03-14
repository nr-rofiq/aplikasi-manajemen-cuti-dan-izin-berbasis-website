package service

import (
	"backend/domain"
	"backend/dto"
	"backend/internal/config"
	"backend/internal/util"
	"context"
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
)

type approvalService struct {
	conf               *config.Config
	approvalRepository domain.ApprovalRepository
}

func NewApproval(cnf *config.Config, approvalRepository domain.ApprovalRepository) domain.ApprovalService {
	return &approvalService{
		conf:               cnf,
		approvalRepository: approvalRepository,
	}
}

// Index implements domain.ApprovalService.
func (a *approvalService) Show(ctx context.Context) ([]map[string]any, error) {
	approvals, err := a.approvalRepository.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	var historyData []map[string]any

	for _, v := range approvals {

		nama, _ := a.approvalRepository.FindUserByNIP(ctx, v.NipUser)

		// Durasi
		subStartDate := v.StartDate[:10]
		subEndDate := v.EndDate[:10]

		layout := "2006-01-02"
		startDate, _ := time.Parse(layout, subStartDate)
		endDate, _ := time.Parse(layout, subEndDate)

		totalWeekdays := util.CountWeekdays(startDate, endDate)

		// Jenis Cuti
		var jenisCuti string

		switch v.IDJenisCuti {
		case "C01":
			jenisCuti = "Cuti Tahunan"
		case "C02":
			jenisCuti = "Cuti Besar"
		case "C03":
			jenisCuti = "Cuti Sakit"
		case "C04":
			jenisCuti = "Cuti Melahirkan"
		case "C05":
			jenisCuti = "Cuti Karena Alasan Penting"
		}

		historyData = append(historyData, fiber.Map{
			"id":             v.ID,
			"nama":           nama,
			"start_date":     subStartDate,
			"end_date":       subEndDate,
			"durasi":         totalWeekdays,
			"jenis_cuti":     jenisCuti,
			"alasan_cuti":    v.AlasanCuti,
			"alasan_ditolak": v.AlasanDitolak,
			"status":         v.Status,
		})
	}

	return historyData, nil
}

// Update implements domain.ApprovalService.
func (a *approvalService) Update(ctx context.Context, req dto.UpdateApprovalRequest) error {
	persisted, err := a.approvalRepository.FindById(ctx, req.ID)
	if err != nil {
		return err
	}

	if persisted.ID == 0 {
		return errors.New("data user tidak ditemukan")
	}

	persisted.Status = req.Status
	persisted.AlasanDitolak = req.AlasanDitolak

	return a.approvalRepository.Update(ctx, &persisted)
}
