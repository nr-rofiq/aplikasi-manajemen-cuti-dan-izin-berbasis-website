import DatePicker from "react-datepicker";

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
}: AdminView) => {
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
								Administrator
							</a>
						</li>
					</ul>
				</div>
				<div className="w-6/8 lg:w-7/8 p-4 lg:p-8 bg-gray-100 flex flex-col">
					<div className="flex justify-between">
						<div className="bg-white w-full py-8 px-4 shadow-lg">
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
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="m1 1 4 4 4-4"
													/>
												</svg>
											</>
										)}
									</button>

									{status && (
										<div className="z-10 shadow-sm">
											<ul className="py-2 text-sm cursor-pointer bg-indigo-800 rounded-md text-white">
												<li
													className="block px-4 py-2 hover:bg-indigo-900"
													value="Disetujui"
													onClick={handleItemClick}
												>
													Disejutui
												</li>
												<li
													className="block px-4 py-2 hover:bg-indigo-900"
													value="Menunggu"
													onClick={handleItemClick}
												>
													Menunggu
												</li>
												<li
													className="block px-4 py-2 hover:bg-indigo-900"
													value="Ditolak"
													onClick={handleItemClick}
												>
													Ditolak
												</li>
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
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
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
					<div className="bg-white shadow-lg p-5 rounded-md mt-4 flex-1 flex flex-col">
						<div className="flex-1">
							<h1 className="text-xl font-bold mb-4 border-b pb-2">
								Histori Cuti
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
									<tr className="border-b border-gray-700">
										<td className="px-4 py-2">Joko</td>
										<td className="px-4 py-2">2023-10-01 2023-10-03</td>
										<td className="px-4 py-2">2 Hari</td>
										<td className="px-4 py-2">Cuti Tahunan</td>
										<td className="px-4 py-2">
											<span className="bg-green-200 text-green-600 font-bold px-2 py-1 rounded-md text-sm">
												Disetujui
											</span>
										</td>
										<td className="px-4 py-2">
											<button className="bg-indigo-800 text-white cursor-pointer px-4 py-1 rounded-md hover:bg-indigo-900">
												Detail
											</button>
										</td>
									</tr>
									<tr className="border-b border-gray-700">
										<td className="px-4 py-2">Budi</td>
										<td className="px-4 py-2">2023-10-05 2023-10-06</td>
										<td className="px-4 py-2">1 Hari</td>
										<td className="px-4 py-2">Cuti Sakit</td>
										<td>
											<span className="bg-yellow-200 text-yellow-600 font-bold px-2 py-1 rounded-md text-sm">
												Menunggu
											</span>
										</td>
										<td className="px-4 py-2">
											<button className="bg-indigo-800 text-white cursor-pointer px-4  py-1 rounded-md hover:bg-indigo-900">
												Setujui
											</button>
										</td>
									</tr>
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
			</div>
		</>
	);
};

export default AdminView;
