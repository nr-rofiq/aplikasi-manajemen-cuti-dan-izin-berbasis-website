package api

import (
	"backend/domain"
	"backend/dto"
	"context"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
)

type userApi struct {
	userService domain.UserService
}

func NewUser(app *fiber.App, userService domain.UserService) {
	ua := userApi{
		userService: userService,
	}

	app.Post("/users/login", ua.Login)
}

func (ua userApi) Login(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10*time.Second)
	defer cancel()

	var req dto.LoginRequest
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(dto.CreateAPIResponse("request tidak valid", ""))
	}

	res, err := ua.userService.Login(c, req)
	if err != nil {
		return ctx.Status(http.StatusUnauthorized).JSON(dto.CreateAPIResponse(err.Error(), ""))
	}

	return ctx.Status(http.StatusOK).JSON(dto.CreateAPIResponse("success", res))
}
