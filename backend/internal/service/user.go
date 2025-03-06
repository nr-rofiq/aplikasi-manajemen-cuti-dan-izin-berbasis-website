package service

import (
	"backend/domain"
	"backend/dto"
	"context"
	"errors"
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
			ID:      v.ID,
			Nama:    v.Nama,
			Jabatan: v.Jabatan,
		})
	}

	return userData, nil
}

// Create implements domain.UserService.
func (u *userService) Create(ctx context.Context, req dto.CreateUserRequest) error {
	user := domain.User{
		ID:       req.ID,
		Nama:     req.Nama,
		Password: req.Password,
		Jabatan:  req.Jabatan,
		TMT:      req.TMT,
	}

	return u.userRepository.Save(ctx, &user)
}

// Update implements domain.UserService.
func (u *userService) Update(ctx context.Context, req dto.UpdateUserRequest) error {
	persisted, err := u.userRepository.FindById(ctx, req.ID)
	if err != nil {
		return err
	}

	if persisted.ID == "" {
		return errors.New("data user tidak ditemukan")
	}

	persisted.Nama = req.Nama
	persisted.Password = req.Password
	persisted.Jabatan = req.Jabatan

	return u.userRepository.Update(ctx, &persisted)
}

// Delete implements domain.UserService.
func (u *userService) Delete(ctx context.Context, id string) error {
	exist, err := u.userRepository.FindById(ctx, id)
	if err != nil {
		return err
	}

	if exist.ID == "" {
		return errors.New("data user tidak ditemukan")
	}

	return u.userRepository.Delete(ctx, id)
}

// Show implements domain.UserService.
func (u *userService) Show(ctx context.Context, id string) (dto.UserData, error) {
	persisted, err := u.userRepository.FindById(ctx, id)
	if err != nil {
		return dto.UserData{}, err
	}

	if persisted.ID == "" {
		return dto.UserData{}, errors.New("data user tidak ditemukan")
	}

	return dto.UserData{
		ID: persisted.ID,
		Nama: persisted.Nama,
		Jabatan: persisted.Jabatan,
	}, nil
}