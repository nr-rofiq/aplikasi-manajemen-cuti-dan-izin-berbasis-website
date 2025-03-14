package dto

type APIResponse struct {
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func CreateAPIResponse(message string, data any) APIResponse {
	return APIResponse{
		Message: message,
		Data:    data,
	}
}

type ServiceResponse struct {
	Data any `json:"data"`
}