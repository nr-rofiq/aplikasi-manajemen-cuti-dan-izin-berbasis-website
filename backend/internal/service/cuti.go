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

type cutiService struct {
	conf           *config.Config
	cutiRepository domain.CutiRepository
}

func NewCuti(cnf *config.Config, cutiRepository domain.CutiRepository) domain.CutiService {
	return &cutiService{
		conf:           cnf,
		cutiRepository: cutiRepository,
	}
}

// Create implements domain.CutiService.
func (c *cutiService) Create(ctx context.Context, req dto.CutiRequest) error {
	cuti := domain.Cuti{
		NipUser:     req.NipUser,
		IDJenisCuti: req.IDJenisCuti,
		StartDate:   req.StartDate,
		EndDate:     req.EndDate,
		Alasan:      req.Alasan,
	}

	return c.cutiRepository.Save(ctx, &cuti)
}

// Show implements domain.CutiService.
func (c *cutiService) Show(ctx context.Context, nip string) (map[string]any, error) {
	cutis, err := c.cutiRepository.FindByNIP(ctx, nip)
	if err != nil {
		return nil, err
	}

	var saldoData map[string]any
	var historiData []map[string]any

	cutiTersedia := 12
	cutiTerpakai := 0
	menunggu := 0
	disetujui := 0

	for _, v := range cutis {

		if v.ID == 0 {
			return nil, errors.New("data user tidak ditemukan")
		}

		subStartDate := v.StartDate[:10]
		subEndDate := v.EndDate[:10]

		layout := "2006-01-02"
		startDate, _ := time.Parse(layout, subStartDate)
		endDate, _ := time.Parse(layout, subEndDate)

		totalWeekdays := util.CountWeekdays(startDate, endDate)

		var jenisCuti string

		if v.IDJenisCuti == "C01" && v.Status == "Disetujui" {
			cutiTersedia -= totalWeekdays
			cutiTerpakai += totalWeekdays
		}

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

		if v.Status == "Menunggu" {
			menunggu += 1
		} else if v.Status == "Disetujui" {
			disetujui += 1
		}

		tanggal := v.CreatedAt[:10]

		historiData = append(historiData, fiber.Map{
			"id":             v.ID,
			"tanggal":        tanggal,
			"jenis_cuti":     jenisCuti,
			"durasi":         totalWeekdays,
			"alasan_cuti":    v.Alasan,
			"alasan_ditolak": v.AlasanDitolak,
			"status":         v.Status,
		})
	}

	saldoData = fiber.Map{
		"cuti_tersedia": cutiTersedia,
		"cuti_terpakai": cutiTerpakai,
		"menunggu":      menunggu,
		"disetujui":     disetujui,
	}

	// return historiData, nil
	return fiber.Map{
		"saldo":   saldoData,
		"histori": historiData,
	}, nil
}
