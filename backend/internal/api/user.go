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

// Injeksi Fiber App
func NewUser(app *fiber.App, userService domain.UserService) {
	ua := userApi{
		userService: userService,
	}

	app.Get("/users", ua.Index)
}

func (ua userApi) Index(ctx *fiber.Ctx) error {
	c, cancel := context.WithTimeout(ctx.Context(), 10 * time.Second)
	defer cancel()

	res, err := ua.userService.Index(c)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(dto.CreateResponseError(err.Error()))
	}

	return ctx.JSON(dto.CreateResponseSuccess(res))
}