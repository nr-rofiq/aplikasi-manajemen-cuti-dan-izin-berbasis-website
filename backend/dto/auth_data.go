package dto

type AuthRequest struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string `json:"token"`
}
