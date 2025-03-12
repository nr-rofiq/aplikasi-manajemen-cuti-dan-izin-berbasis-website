import { useRouter, useRouterState } from "@tanstack/react-router";
import { useAuth } from "../../auth";
import View from "./View";
import { FormEvent, useState } from "react";

const Login = () => {
	const { data, login } = useAuth();
	const router = useRouter();
	const isLoading = useRouterState({ select: (s) => s.isLoading });
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [formData, setFormData] = useState<{ nip: string; password: string }>({
		nip: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await login(formData.nip, formData.password);
			await router.invalidate();

			if (data?.is_ppk) {
				router.navigate({ to: "/admin" });
			} else {
				router.navigate({ to: "/user" });
			}
		} catch (error) {
			console.error("Error logging in: ", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isLoggingIn = isLoading || isSubmitting;

	return (
		<div>
			<View
				onFormSubmit={onFormSubmit}
				isLoggingIn={isLoggingIn}
				handleChange={handleChange}
			/>
		</div>
	);
};

export default Login;
