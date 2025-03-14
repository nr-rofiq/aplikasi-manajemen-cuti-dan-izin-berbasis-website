package api

import (
	"backend/domain"
	"backend/dto"
	"backend/internal/middleware"
	"backend/internal/util"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
)

type cutiApi struct {
	cutiService domain.CutiService
}

func NewCuti(app *fiber.App, cutiService domain.CutiService) {
	ca := cutiApi{
		cutiService: cutiService,
	}

	middlewareAuth := middleware.AuthMiddleware()

	app.Get("/cuti", middlewareAuth, ca.Show)
	app.Post("/cuti", middlewareAuth, ca.Create)
}

func (ca cutiApi) Show(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10*time.Second)
	defer cancel()

	// id := ctx.Params("id")
	nip := ctx.Locals("nip").(string)
	// fmt.Println(nip)
	data, err := ca.cutiService.Show(c, nip)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(dto.CreateAPIResponse(err.Error(), ""))
	}

	return ctx.Status(http.StatusOK).JSON(dto.CreateAPIResponse("success", data))
}

func (ca cutiApi) Create(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10*time.Second)
	defer cancel()

	var req dto.CutiRequest
	if err := ctx.BodyParser(&req); err != nil {

		fmt.Println(err)
		return ctx.SendStatus(http.StatusUnprocessableEntity)
	}

	fails := util.Validate(req)
	if len(fails) > 0 {
		return ctx.Status(http.StatusBadRequest).JSON(dto.CreateAPIResponse("validation failed", fails))
	}

	req.NipUser = ctx.Locals("nip").(string)

	err := ca.cutiService.Create(c, req)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(dto.CreateAPIResponse(err.Error(), ""))
	}

	return ctx.Status(http.StatusCreated).JSON(dto.CreateAPIResponse("success", fiber.Map{"status": "created"}))
}
