package service

import (
	"backend/domain"
	"backend/dto"
	"backend/internal/config"
	"backend/internal/util"
	"context"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type authService struct {
	conf           *config.Config
	userRepository domain.UserRepository
}

func NewAuth(cnf *config.Config, userRepository domain.UserRepository) domain.AuthService {
	return authService{
		conf:           cnf,
		userRepository: userRepository,
	}
}

// Login implements domain.AuthService.
func (a authService) Login(ctx context.Context, req dto.AuthRequest) (dto.AuthResponse, error) {
	user, err := a.userRepository.FindById(ctx, req.ID)
	if err != nil {
		return dto.AuthResponse{}, err
	}

	if user.ID == "" {
		return dto.AuthResponse{}, errors.New("authentication gagal")
	}

	err = util.CheckPassword(user.Password, req.Password)
	if err != nil {
		return dto.AuthResponse{}, errors.New("authentication gagal")
	}

	// Generate token, bila suskses login
	claim := jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Duration(a.conf.Jwt.Exp) * time.Minute).Unix(), // Epoch Time
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	tokenStr, err := token.SignedString([]byte(a.conf.Jwt.Key))
	if err != nil {
		return dto.AuthResponse{}, errors.New("authentication gagal")
	}

	return dto.AuthResponse{
		Token: tokenStr,
	}, nil
}
