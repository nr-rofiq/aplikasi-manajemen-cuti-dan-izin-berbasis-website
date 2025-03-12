import { AxiosError } from "axios";
import api from ".";

const ENDPOINT = {
	LOGIN: "/users/login",
	CUTI: "/cuti",
};

interface Login {
	message: string;
	data: {
		token: string;
		nama: string;
		jabatan: string;
		is_ppk: boolean;
	};
}

interface AddCuti {
	id_jenis_cuti: string;
	start_date: string;
	end_date: string;
	alasan: string;
}

interface HistoryCuti {
	message: string;
	data: {
		id: number;
		tanggal: string;
		jenis_cuti: string;
		durasi: number;
		alasan: string;
		status: string;
	};
}

const loginService = async (nip: string, password: string): Promise<Login> => {
	try {
		const loginData: {
			data: Login;
		} = await api.post(ENDPOINT.LOGIN, { nip, password });
		return loginData.data;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error("Axios Error:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Login failed");
		} else {
			console.error("Unexpected Error:", err);
			throw new Error("An unexpected error occurred");
		}
	}
};

const addCutiService = async (
	id_jenis_cuti: string,
	start_date: string,
	end_date: string,
	alasan: string
): Promise<AddCuti> => {
	try {
		const authData = localStorage.getItem("tanstack.auth");
		let token = "";

		if (authData) {
			const parsedAuth = JSON.parse(authData);
			token = parsedAuth.token;
		}

		const addCuti: AddCuti = await api.post(
			ENDPOINT.CUTI,
			{
				id_jenis_cuti,
				start_date,
				end_date,
				alasan,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		return addCuti;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error("Axios Error:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Pengajuan cuti gagal");
		} else {
			console.error("Unexpected Error:", err);
			throw new Error("An unexpected error occurred");
		}
	}
};

const historyCutiService = async (): Promise<HistoryCuti> => {
	try {
		const authData = localStorage.getItem("tanstack.auth");
		let token = "";

		if (authData) {
			const parsedAuth = JSON.parse(authData);
			token = parsedAuth.token;
		}

		const historyData: {
			data: HistoryCuti;
		} = await api.get(ENDPOINT.CUTI, {
			headers: {
				Authorization: token,
				Accept: "application/json",
			},
		});
		return historyData.data;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error("Axios Error:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Histori cuti tidak ada!");
		} else {
			console.error("Unexpected Error:", err);
			throw new Error("An unexpected error occurred");
		}
	}
};

export { loginService, addCutiService, historyCutiService };
