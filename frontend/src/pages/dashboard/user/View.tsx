import { cardDataUser, cutiHistory } from "../../../data/dummy";
import { ModalDetail } from "../../../components/ModalUser/ModalDetail";
import { ModalAdd } from "../../../components/ModalUser/ModalAdd";
import { useAuth } from "../../../auth";
import { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { historyCutiService } from "../../../api/service";

interface UserView {
	addModal: boolean;
	detailModal: boolean;
	isType: boolean;
	start: Date | null;
	end: Date | null;
	selectedCuti: {
		date: Date;
		type: string;
		duration: number;
		status: string;
	} | null;
	handleDateChange: (date: Date | null, type: string) => void;
	openAddModal: () => void;
	openDetailModal: () => void;
	closeAddModal: () => void;
	closeDetailModal: () => void;
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
	setSelectedCuti: React.Dispatch<
		React.SetStateAction<{
			date: Date;
			type: string;
			duration: number;
			status: string;
		} | null>
	>;
	convertTypeCuti: (
		type: string | null
	) =>
		| "Cuti Tahunan"
		| "Cuti Besar"
		| "Cuti Sakit"
		| "Cuti Melahirkan"
		| "Cuti Alasan Penting"
		| undefined;
	isSubmitting: boolean;
	handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	reason: string;
	onFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const UserView = ({
	addModal,
	detailModal,
	isType,
	start,
	end,
	handleDateChange,
	openAddModal,
	openDetailModal,
	closeAddModal,
	closeDetailModal,
	selectedValue,
	selectedCuti,
	setSelectedCuti,
	handleClick,
	handleItemClick,
	colorPill,
	convertTypeCuti,
	isSubmitting,
	handleTextChange,
	reason,
	onFormSubmit,
}: UserView) => {
	const { data } = useAuth();
	const { data: historyData, isPending } = useQuery({
		queryKey: ["historyCuti"],
		queryFn: async () => await historyCutiService(),
	});

	if (!isPending) console.log(historyData?.data);
	return (
		<>
			<div className="flex justify-between">
				<div>
					<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						Dashboard
					</h2>
					<p className="text-gray-400">Selamat datang, {data?.nama}</p>
				</div>
				<div>
					<button
						className="bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-900"
						onClick={openAddModal}
					>
						Pengajuan Cuti
					</button>
				</div>
			</div>
			<div className="mt-4">
				<div className="flex h-[96px] gap-4">
					{cardDataUser.map(
						({ title, day }: { title: string; day: string }, id: number) => (
							<div
								className="flex justify-center flex-col space-y-2 p-4 shadow-lg rounded-md bg-white flex-1"
								key={id}
							>
								<p className="text-sm text-gray-500">{title}</p>
								<h3 className="font-bold text-xl">{day}</h3>
							</div>
						)
					)}
				</div>
			</div>
			<div className="bg-white h-[454px] shadow-lg p-5 rounded-md mt-4 flex justify-between flex-col">
				<div className="flex-1">
					<h1 className="text-xl font-bold mb-4 border-b pb-2">Histori Cuti</h1>
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
							{/* {isPending ? (
								<span>Loading...</span>
							) : (
								historyData?.map(
									({ id:number, tanggal:string, jenis_cuti:string, durasi:number, status:string }) => (
										<tr className="border-b border-gray-700" key={id}>
											<td className="px-4 py-2">
												{new Date(tanggal).toLocaleDateString("id-ID")}
											</td>
											<td className="px-4 py-2">{jenis_cuti}</td>
											<td className="px-4 py-2">{durasi} Hari</td>
											<td className="px-4 py-2">
												<span
													className={`font-bold px-2 py-1 rounded-md text-sm ${colorPill(status)}`}
												>
													{status}
												</span>
											</td>
											<td className="px-4 py-2">
												<button
													className="bg-indigo-800 text-white cursor-pointer px-4 py-1 rounded-md hover:bg-indigo-900"
													onClick={() => {
														setSelectedCuti({
															date: new Date(tanggal),
															type: jenis_cuti,
															duration: durasi,
															status,
														});
														openDetailModal();
													}}
												>
													Detail
												</button>
											</td>
										</tr>
									)
								)
							)} */}

							{cutiHistory.map(
								(
									{
										date,
										type,
										duration,
										status,
									}: {
										date: Date;
										type: string;
										duration: number;
										status: string;
									},
									id: number
								) => (
									<tr className="border-b border-gray-700" key={id}>
										<td className="px-4 py-2">
											{date.toLocaleDateString("id-ID")}
										</td>
										<td className="px-4 py-2">{type}</td>
										<td className="px-4 py-2">{duration} Hari</td>
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
											<button
												className="bg-indigo-800 text-white cursor-pointer px-4 py-1 rounded-md hover:bg-indigo-900"
												onClick={() => {
													setSelectedCuti({ date, type, duration, status });
													openDetailModal();
												}}
											>
												Detail
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
			<ModalAdd
				addModal={addModal}
				handleClick={handleClick}
				selectedValue={selectedValue}
				isType={isType}
				handleItemClick={handleItemClick}
				start={start}
				end={end}
				handleDateChange={handleDateChange}
				closeAddModal={closeAddModal}
				convertTypeCuti={convertTypeCuti}
				isSubmitting={isSubmitting}
				handleTextChange={handleTextChange}
				reason={reason}
				onFormSubmit={onFormSubmit}
			/>
			<ModalDetail
				detailModal={detailModal}
				colorPill={colorPill}
				selectedCuti={selectedCuti}
				handleClick={handleClick}
				closeDetailModal={closeDetailModal}
				setSelectedCuti={setSelectedCuti}
			/>
		</>
	);
};

export default UserView;
