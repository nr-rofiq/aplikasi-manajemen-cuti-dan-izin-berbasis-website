import DatePicker from "react-datepicker";
import { cutiEmployeesData, statusCuti } from "../../../data/dummy";

interface AdminView {
	start: Date | null;
	end: Date | null;
	status: boolean;
	date: boolean;
	selectedValue: string | null;
	handleDateChange: (update: [Date | null, Date | null]) => void;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
	format: (date: Date) => void;
	colorPill: (
		type: string
	) =>
		| "bg-green-200 text-green-600"
		| "bg-yellow-200 text-yellow-600"
		| "bg-red-200 text-red-600"
		| null;
}

const AdminView = ({
	start,
	end,
	status,
	date,
	selectedValue,
	handleDateChange,
	handleClick,
	handleItemClick,
	format,
	colorPill,
}: AdminView) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="bg-white w-full py-6 px-4 shadow-lg">
					<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						Daftar Pegawai
					</h2>
				</div>
			</div>
			<div className="mt-4">
				<div className="p-4 flex shadow-lg rounded-md bg-white h-[96px]">
					<div className="flex w-lg space-x-4">
						<div className="flex gap-1 flex-1 flex-col">
							<p>Status</p>
							<button
								className="text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex items-center"
								type="button"
								onClick={handleClick}
								id="status"
							>
								{selectedValue || (
									<>
										Pilih Status
										<svg
											className={`transition duration-300 w-2.5 h-2.5 ms-3  ${
												status && "rotate-180"
											}`}
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 10 6"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 4 4 4-4"
											/>
										</svg>
									</>
								)}
							</button>

							{status && (
								<div className="z-10 shadow-sm">
									<ul className="py-2 text-sm cursor-pointer bg-indigo-800 rounded-md text-white">
										{statusCuti.map((data: string, id: number) => (
											<li
												className="block px-4 py-2 hover:bg-indigo-900"
												value={data}
												key={id}
												onClick={handleItemClick}
											>
												{data}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
						<div className="flex gap-1 flex-col flex-1">
							<p>Tanggal</p>
							<button
								className="text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex items-center"
								type="button"
								onClick={handleClick}
								id="date"
							>
								{start && end ? (
									`${format(start)}-${format(end)}`
								) : (
									<>
										Pilih Tanggal
										<svg
											className={`transition duration-300 w-2.5 h-2.5 ms-3  ${
												date && "rotate-180"
											}`}
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 10 6"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 4 4 4-4"
											/>
										</svg>
									</>
								)}
							</button>
							{date && (
								<DatePicker
									selectsRange
									startDate={start}
									endDate={end}
									onChange={handleDateChange}
									inline
								/>
							)}
						</div>
					</div>
					<div className="flex-1 justify-end flex mt-7">
						<button className="bg-indigo-800 cursor-pointer text-white font-medium rounded-md text-sm px-8 py-2 hover:bg-indigo-900">
							Pakai Filter
						</button>
					</div>
				</div>
			</div>
			<div className="bg-white h-[430px] shadow-lg p-5 rounded-md mt-4 flex justify-between flex-col">
				<div className="flex-1">
					<h1 className="text-xl font-bold mb-4 border-b pb-2">
						Pengajuan Cuti Pegawai
					</h1>
					<table className="w-full text-left">
						<thead className="bg-gray-200">
							<tr>
								<th className="px-4 py-2">Nama Pegawai</th>
								<th className="px-4 py-2">Tanggal</th>
								<th className="px-4 py-2">Durasi</th>
								<th className="px-4 py-2">Jenis Cuti</th>
								<th className="px-4 py-2">Status</th>
								<th className="px-4 py-2">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{cutiEmployeesData.map(
								(
									{
										name,
										date,
										duration,
										type,
										status,
									}: {
										name: string;
										date: string;
										duration: string;
										type: string;
										status: string;
									},
									id: number
								) => (
									<tr className="border-b border-gray-700" key={id}>
										<td className="px-4 py-2">{name}</td>
										<td className="px-4 py-2">{date}</td>
										<td className="px-4 py-2">{duration}</td>
										<td className="px-4 py-2">{type}</td>
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
												{status == "Menunggu" ? "Setujui" : "Detail"}
											</button>
										</td>
									</tr>
								)
							)}
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
		</>
	);
};

export default AdminView;
