import axios from "axios";

const headers = {
	Accept: "application/json",
	"Content-type": "application/json",
};

const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}`,
	headers,
});

export default api;
