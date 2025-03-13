import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState,
	useContext,
} from "react";
import { loginService } from "../src/api/service";
import { useMutation } from "@tanstack/react-query";
import { sleep } from "./utils";

export interface AuthContext {
	isAuthenticated: boolean;
	login: (nip: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	data: {
		token: string;
		nama: string;
		jabatan: string;
		is_ppk: boolean;
	} | null;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = "tanstack.auth";

const getStoredData = () => {
	const stored = localStorage.getItem(key);
	return stored ? JSON.parse(stored) : null;
};
const setStoredData = (data: AuthContext["data"] | null) => {
	if (data) {
		localStorage.setItem(key, JSON.stringify(data));
	} else {
		localStorage.removeItem(key);
	}
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<AuthContext["data"] | null>(getStoredData());
	const isAuthenticated = !!data;

	const loginMutation = useMutation({
		mutationFn: ({ nip, password }: { nip: string; password: string }) =>
			loginService(nip, password),
		onSuccess: (userData) => {
			setStoredData(userData.data);
			setData(userData.data);
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});

	const login = useCallback(
		async (nip: string, password: string) => {
			await loginMutation.mutateAsync({ nip, password });
		},
		[loginMutation]
	);

	const logout = useCallback(async () => {
		sleep(100);

		setStoredData(null);
		setData(null);
	}, []);

	useEffect(() => {
		setData(getStoredData());
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, data, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
