package util

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	// Generate hash dari password dengan cost 10
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}

func CheckPassword(hashedPassword, plainPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	// return err == nil // Jika tidak ada error, berarti password cocok
	return err
}