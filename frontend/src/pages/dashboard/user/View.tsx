import { cardDataUser } from "../../../data/dummy";
import { ModalDetail } from "../../../components/ModalUser/ModalDetail";
import { ModalAdd } from "../../../components/ModalUser/ModalAdd";
import { FormEvent } from "react";

interface SaldoCuti {
	cuti_tersedia: number;
	cuti_terpakai: number;
	menunggu: number;
	disetujui: number;
}
interface HistoryData {
	tanggal: string;
	jenis_cuti: string;
	status: string;
	id: number;
	durasi: number;
	alasan_cuti: string;
	alasan_ditolak: string;
}
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
		alasan: string;
		alasanDitolak: string;
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
			alasan: string;
			alasanDitolak: string;
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
	isPending: boolean;
	historyData:
		| {
				data: {
					saldo: SaldoCuti;
					histori: [HistoryData];
				};
		  }
		| undefined;
	name: string | undefined;
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
	isPending,
	historyData,
	name,
}: UserView) => {
	return (
		<div className="h-screen p-4 lg:p-8">
			<div className="flex justify-between">
				<div>
					<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						Dashboard
					</h2>
					<p className="text-gray-400">Selamat datang, {name}</p>
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
						(
							{
								title,
								key,
							}: {
								title: string;
								key: keyof SaldoCuti;
							},
							id: number
						) => (
							<div
								className="flex justify-center flex-col space-y-2 p-4 shadow-lg rounded-md bg-white flex-1"
								key={id}
							>
								<p className="text-sm text-gray-500">{title}</p>
								<h3 className="font-bold text-xl">
									{historyData?.data.saldo[key]}
								</h3>
							</div>
						)
					)}
				</div>
			</div>
			<div className="bg-white h-[454px] shadow-lg p-5 rounded-md mt-4 flex flex-col">
				<div className="flex-1 overflow-auto">
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
						<tbody className="h-full">
							{isPending ? (
								<tr>
									<td>Loading...</td>
								</tr>
							) : (
								historyData?.data?.histori?.map(
									({
										tanggal,
										jenis_cuti,
										status,
										id,
										durasi,
										alasan_cuti,
										alasan_ditolak,
									}: HistoryData) => (
										<tr className="border-b border-gray-700" key={id}>
											<td className="px-4 py-2">{tanggal}</td>
											<td className="px-4 py-2">{jenis_cuti}</td>
											<td className="px-4 py-2">{durasi} Hari</td>
											<td className="px-4 py-2">
												<p
													className={`font-bold w-fit px-2 py-1 rounded-md text-sm ${colorPill(status)}`}
												>
													{status}
												</p>
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
															alasan: alasan_cuti,
															alasanDitolak: alasan_ditolak,
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
							)}
						</tbody>
					</table>
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
		</div>
	);
};

export default UserView;
