import { FormEvent } from "react";

interface LoginView {
	onFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	isLoggingIn: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginView = ({ onFormSubmit, isLoggingIn, handleChange }: LoginView) => {
	return (
		<>
			<div className="flex bg-gray-200 h-screen items-center justify-center mx-auto">
				<div className="bg-white w-[360px] rounded-md shadow-lg">
					<div className="flex flex-col p-8">
						<div className="mb-2">
							<h1 className="text-xl font-bold text-center leading-tight tracking-tight">
								APP CUTI
							</h1>
							<p className="text-base text-center leading-tight tracking-tight">
								Silahkan masuk ke akunmu
							</p>
						</div>
						<form onSubmit={onFormSubmit}>
							<fieldset className="space-y-8" disabled={isLoggingIn}>
								<div>
									<label
										className="block mb-2 text-sm font-medium text-gray-900"
										htmlFor="nip"
									>
										NIP
									</label>
									<input
										className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										type="text"
										name="nip"
										id="nip"
										placeholder="Masukkan NIP"
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<label
										className="block mb-2 text-sm font-medium text-gray-900"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										type="password"
										name="password"
										id="password"
										placeholder="Masukkan password"
										onChange={handleChange}
										required
									/>
								</div>
								<button
									type="submit"
									className="bg-indigo-800 cursor-pointer w-full text-white px-4 py-2 rounded-md hover:bg-indigo-900"
								>
									{isLoggingIn ? "Loading..." : "Login"}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginView;
