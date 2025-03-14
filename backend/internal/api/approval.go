package api

import (
	"backend/domain"
	"backend/dto"
	"backend/internal/middleware"
	"backend/internal/util"
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

type approvalApi struct {
	approvalService domain.ApprovalService
}

func NewApproval(app *fiber.App, approvalService domain.ApprovalService) {
	aa := approvalApi{
		approvalService: approvalService,
	}

	middlewareAuth := middleware.AuthMiddleware()

	app.Get("/approval", middlewareAuth, aa.Show)
	app.Put("/approval/:id", middlewareAuth, aa.Update)
}

func (aa approvalApi) Show(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10*time.Second)
	defer cancel()

	data, err := aa.approvalService.Show(c)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(dto.CreateAPIResponse(err.Error(), ""))
	}

	return ctx.Status(http.StatusOK).JSON(dto.CreateAPIResponse("success", data))
}

func (aa approvalApi) Update(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10*time.Second)
	defer cancel()

	var req dto.UpdateApprovalRequest
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.SendStatus(http.StatusUnprocessableEntity)
	}

	fails := util.Validate(req)
	if len(fails) > 0 {
		return ctx.Status(http.StatusBadRequest).JSON(dto.CreateAPIResponse("validation error", fails))
	}

	// /users/:id
	req.ID, _ = strconv.Atoi(ctx.Params("id"))
	err := aa.approvalService.Update(c, req)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(dto.CreateAPIResponse(err.Error(), ""))
	}

	return ctx.Status(http.StatusOK).JSON(fiber.Map{
		"message": "success",
		"data": fiber.Map{
			"status": "updated",
		},
	})
}