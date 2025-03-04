package dto

// DTO = format data request/response (data yg dikirimkan ke client/response)
type UserData struct {
	ID      string `json:"id"`
	Nama    string `json:"nama"`
	Jabatan string `json:"jabatan"`
}
