import DatePicker from "react-datepicker";
import Modal from "../../../components/modal/Modal";
import { cardDataUser, cutiHistory, dropdownData } from "../../../data/dummy";

interface UserView {
	isModal: boolean;
	isType: boolean;
	start: Date | null;
	end: Date | null;
	handleDateChange: (date: Date | null, type: string) => void;
	openModal: () => void;
	closeModal: () => void;
	selectedValue: string | null;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
	colorPill: (
		type: string
	) =>
		| "bg-green-200 text-green-600"
		| "bg-yellow-200 text-yellow-600"
		| "bg-red-200 text-red-600"
		| null;
}

const UserView = ({
	isModal,
	isType,
	start,
	end,
	handleDateChange,
	openModal,
	closeModal,
	selectedValue,
	handleClick,
	handleItemClick,
	colorPill,
}: UserView) => {
	return (
		<>
			<div className="flex h-screen">
				<div className="w-2/8 p-4 lg:w-1/8 space-y-2 text-white bg-indigo-800">
					<h1 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						APP CUTI
					</h1>
					<ul>
						<li className="py-2 px-4 cursor-pointer text-white hover:bg-indigo-950 hover:text-white/90 rounded-md">
							<a href="#" className="w-full">
								Dashboard
							</a>
						</li>
					</ul>
				</div>
				<div className="w-6/8 lg:w-7/8 p-4 lg:p-8 bg-gray-100 flex flex-col">
					<div className="flex justify-between">
						<div>
							<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
								Dashboard
							</h2>
							<p className="text-gray-400">Selamat datang, Joko</p>
						</div>
						<div>
							<button
								className="bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-900"
								onClick={openModal}
							>
								Pengajuan Cuti
							</button>
						</div>
					</div>
					<div className="mt-4">
						<div className="flex h-[96px] gap-4">
							{cardDataUser.map(({ title, day }, id) => (
								<div
									className="flex justify-center flex-col space-y-2 p-4 shadow-lg rounded-md bg-white flex-1"
									key={id}
								>
									<p className="text-sm text-gray-500">{title}</p>
									<h3 className="font-bold text-xl">{day}</h3>
								</div>
							))}
						</div>
					</div>
					<div className="bg-white shadow-lg p-5 rounded-md mt-4 flex-1 flex flex-col">
						<div className="flex-1">
							<h1 className="text-xl font-bold mb-4 border-b pb-2">
								Histori Cuti
							</h1>
							<table className="w-full text-left">
								<thead className="bg-gray-200">
									<tr>
										<th className="px-4 py-2">Tanggal</th>
										<th className="px-4 py-2">Jenis Cuti</th>
										<th className="px-4 py-2">Durasi</th>
										<th className="px-4 py-2">Status</th>
										<th className="px-4 py-2">Aksi</th>
									</tr>
								</thead>
								<tbody>
									{cutiHistory.map(({ date, type, duration, status }, id) => (
										<tr className="border-b border-gray-700" key={id}>
											<td className="px-4 py-2">{date}</td>
											<td className="px-4 py-2">{type}</td>
											<td className="px-4 py-2">{duration}</td>
											<td className="px-4 py-2">
												<span
													className={`font-bold px-2 py-1 rounded-md text-sm ${colorPill(
														status
													)}`}
												>
													{status}
												</span>
											</td>
											<td className="px-4 py-2">
												<button className="bg-indigo-800 text-white cursor-pointer px-4 py-1 rounded-md hover:bg-indigo-900">
													Detail
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex justify-between items-center mt-4">
							<p>Menampilkan 1 - 3 dari 10 data</p>
							<div className="flex items-center">
								<button className="bg-indigo-800 rounded-l-md cursor-pointer text-white px-4 py-2 hover:bg-indigo-900">
									Sebelumnya
								</button>
								<p className="py-2 px-4 bg-gray-200">1</p>
								<button className="bg-indigo-800 rounded-r-md text-white cursor-pointer px-4 py-2 hover:bg-indigo-900">
									Selanjutnya
								</button>
							</div>
						</div>
					</div>
				</div>
				<Modal isOpen={isModal}>
					<div>
						<div className="space-y-1 border-b pb-4 mb-4">
							<h2 className="text-2xl cursor-default font-bold leading-tight tracking-tight">
								Form Pengajuan Cuti
							</h2>
							<p className="text-gray-600 text-sm">
								Silahkan isi semua kolom yang diperlukan untuk mengajukan
								permohonan cuti.
							</p>
						</div>
						<form className="space-y-4">
							<div>
								<div className="flex relative gap-1 flex-1 flex-col">
									<p className="block mb-2 text-sm font-medium text-gray-900">
										Jenis Cuti
									</p>
									<button
										className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
										type="button"
										onClick={handleClick}
									>
										{selectedValue || "Jenis Cuti"}
									</button>

									{isType && (
										<div className="absolute z-20 w-full top-20 shadow-sm">
											<ul className="py-2 text-sm cursor-pointer bg-indigo-800 rounded-md text-white">
												{dropdownData.map((data, id) => (
													<li
														className="block px-2 py-2 hover:bg-indigo-900"
														value={data}
														onClick={handleItemClick}
														key={id}
													>
														{data}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
							<div className="flex justify-between">
								<div>
									<p className="block mb-2 text-sm font-medium text-gray-900">
										Tanggal Mulai
									</p>
									<DatePicker
										className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
										selected={start}
										onChange={(date) => handleDateChange(date, "start")}
									/>
								</div>
								<div>
									<p className="block mb-2 text-sm font-medium text-gray-900">
										Tanggal Berakhir
									</p>
									<DatePicker
										className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
										selected={end}
										onChange={(date) => handleDateChange(date, "end")}
									/>
								</div>
							</div>
							<div>
								<label
									className="block mb-2 text-sm font-medium text-gray-900"
									htmlFor="reason"
								>
									Alasan Cuti
								</label>
								<textarea
									className="bg-gray-50 w-full focus:ring border rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									name="reason"
									placeholder="Alasan Cuti"
									wrap="true"
								/>
							</div>

							<div className="flex justify-end items-end gap-2">
								<button
									className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:opacity-30"
									onClick={closeModal}
								>
									Tutup
								</button>
								<button
									className="bg-indigo-800 cursor-pointer w-1/3 text-white px-4 py-2 rounded-md hover:bg-indigo-900"
									type="submit"
								>
									Ajukan
								</button>
							</div>
						</form>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default UserView;
