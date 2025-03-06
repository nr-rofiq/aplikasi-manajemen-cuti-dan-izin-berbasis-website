package dto

// DTO = format data request/response (data yg dikirimkan ke client/response)
type UserData struct {
	ID      string `json:"id"`
	Nama    string `json:"nama"`
	Jabatan string `json:"jabatan"`
}

type CreateUserRequest struct {
	ID       string `json:"id" validate:"required"`
	Nama     string `json:"nama" validate:"required"`
	Password string `json:"password" validate:"required"`
	Jabatan  string `json:"jabatan" validate:"required"`
	TMT      string `json:"tmt" validate:"required"`
}

type UpdateUserRequest struct {
	ID       string `json:"-"`
	Nama     string `json:"nama" validate:"required"`
	Password string `json:"password" validate:"required"`
	Jabatan  string `json:"jabatan" validate:"required"`
}
