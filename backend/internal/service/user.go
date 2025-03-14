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
	"github.com/golang-jwt/jwt/v5"
)

// Implementasi interface UserService "domain >> user.go"
type userService struct {
	conf           *config.Config
	userRepository domain.UserRepository
}

func NewUser(cnf *config.Config, userRepository domain.UserRepository) domain.UserService {
	return &userService{
		conf:           cnf,
		userRepository: userRepository,
	}
}

// Login implements domain.UserService.
func (u *userService) Login(ctx context.Context, req dto.LoginRequest) (map[string]any, error) {
	user, err := u.userRepository.FindById(ctx, req.NIP)
	if err != nil {
		return nil, err
	}

	if user.Nip == "" {
		return nil, errors.New("username atau password salah")
	}

	err = util.CheckPassword(user.Password, req.Password)
	if err != nil {
		return nil, errors.New("username atau password salah")
	}

	// Generate token, bila suskses login
	claim := jwt.MapClaims{
		"nip": user.Nip,
		"exp": time.Now().Add(time.Duration(u.conf.Jwt.Exp) * time.Hour).Unix(), // Epoch Time
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	tokenStr, err := token.SignedString([]byte(u.conf.Jwt.Key))
	if err != nil {
		return nil, errors.New("authentication gagal")
	}

	return fiber.Map{
		"token":   tokenStr,
		"nama":    user.Nama,
		"jabatan": user.Jabatan,
		"is_ppk":  user.IsPPK,
	}, nil

	// return dto.APIResponse{
	// 	Token: tokenStr,
	// }, nil

}
