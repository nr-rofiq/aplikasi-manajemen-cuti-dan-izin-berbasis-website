package service

import (
	"backend/domain"
	"backend/dto"
	"context"
)

// Implementasi interface UserService "domain >> user.go"
type userService struct {
	userRepository domain.UserRepository
}

func NewUser(userRepository domain.UserRepository) domain.UserService {
	return &userService{
		userRepository: userRepository,
	}
}

// Index implements domain.UserService.
func (u *userService) Index(ctx context.Context) ([]dto.UserData, error) {
	users, err := u.userRepository.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	var userData []dto.UserData
	for _, v := range users {
		userData = append(userData, dto.UserData{
			ID: v.ID,
			Nama: v.Nama,
			Jabatan: v.Jabatan,
		})
	}

	return userData, nil
}
