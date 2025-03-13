import React, { FormEvent } from "react";
import { ModalApproval } from "../../../components/ModalAdmin/ModalApproval";
import { ModalDetail } from "../../../components/ModalAdmin/ModalDetail";

interface HistoryApproval {
	id: number;
	nama: string;
	start_date: string;
	end_date: string;
	durasi: number;
	jenis_cuti: string;
	status: string;
	alasan: string;
	alasan_ditolak: string;
}
interface AdminView {
	format: (date: Date) => void;
	colorPill: (
		type: string
	) =>
		| "bg-green-200 text-green-600"
		| "bg-yellow-200 text-yellow-600"
		| "bg-red-200 text-red-600"
		| null;
	historyApproval: { message: string; data: [HistoryApproval] } | undefined;
	isPending: boolean;
	setSelectedCuti: React.Dispatch<
		React.SetStateAction<{
			id: number;
			nama: string;
			start: Date;
			end: Date;
			duration: number;
			type: string;
			status: string;
			reason: string;
			rejectedReason: string;
		} | null>
	>;
	selectedCuti: {
		id: number;
		nama: string;
		start: Date;
		end: Date;
		duration: number;
		type: string;
		status: string;
		reason: string;
		rejectedReason: string;
	} | null;
	openApprovalModal: () => void;
	openDetailModal: () => void;
	closeApprovalModal: () => void;
	closeDetailModal: () => void;
	approvalModal: boolean;
	detailModal: boolean;
	selectedValue: string | null;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
	isType: boolean;
	setSelectedValue: React.Dispatch<string>;
	handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	reason: string;
	onSubmitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const AdminView = ({
	colorPill,
	historyApproval,
	setSelectedCuti,
	selectedCuti,
	approvalModal,
	detailModal,
	openApprovalModal,
	openDetailModal,
	closeApprovalModal,
	closeDetailModal,
	handleClick,
	handleItemClick,
	selectedValue,
	isType,
	setSelectedValue,
	handleTextChange,
	reason,
	onSubmitForm,
}: AdminView) => {
	return (
		<div className="h-screen p-4 lg:p-8">
			<div className="flex justify-between">
				<div className="bg-white w-full py-6 px-4 shadow-lg">
					<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						Daftar Pegawai
					</h2>
				</div>
			</div>
			<div className="bg-white h-[540px] shadow-lg p-5 rounded-md mt-4 flex justify-between flex-col">
				<div className="flex-1">
					<h1 className="text-xl font-bold mb-4 border-b pb-2">
						Pengajuan Cuti Pegawai
					</h1>
					<table className="w-full text-left">
						<thead className="bg-gray-200">
							<tr>
								<th className="px-4 py-2">Nama Pegawai</th>
								<th className="px-4 py-2">Tanggal Mulai</th>
								<th className="px-4 py-2">Tanggal Berakhir</th>
								<th className="px-4 py-2">Durasi</th>
								<th className="px-4 py-2">Jenis Cuti</th>
								<th className="px-4 py-2">Status</th>
								<th className="px-4 py-2">Aksi</th>
							</tr>
						</thead>
						<tbody className="overflow-y-scroll">
							{historyApproval?.data.map(
								({
									id,
									nama,
									start_date,
									end_date,
									durasi,
									jenis_cuti,
									status,
									alasan,
									alasan_ditolak,
								}: HistoryApproval) => (
									<tr className="border-b border-gray-700" key={id}>
										<td className="px-4 py-2">{nama}</td>
										<td className="px-4 py-2">{start_date}</td>
										<td className="px-4 py-2">{end_date}</td>
										<td className="px-4 py-2">{durasi} Hari</td>
										<td className="px-4 py-2">{jenis_cuti}</td>
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
													setSelectedCuti({
														id,
														nama,
														start: new Date(start_date),
														end: new Date(end_date),
														duration: durasi,
														type: jenis_cuti,
														status,
														reason: alasan,
														rejectedReason: alasan_ditolak,
													});
													if (status == "Menunggu") {
														openApprovalModal();
													} else {
														openDetailModal();
													}
												}}
											>
												{status == "Menunggu" ? "Setujui" : "Detail"}
											</button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
			<ModalDetail
				selectedCuti={selectedCuti}
				detailModal={detailModal}
				colorPill={colorPill}
				setSelectedCuti={setSelectedCuti}
				closeDetailModal={closeDetailModal}
			/>
			<ModalApproval
				selectedCuti={selectedCuti}
				approvalModal={approvalModal}
				colorPill={colorPill}
				setSelectedCuti={setSelectedCuti}
				closeApprovalModal={closeApprovalModal}
				handleClick={handleClick}
				handleItemClick={handleItemClick}
				selectedValue={selectedValue}
				isType={isType}
				setSelectedValue={setSelectedValue}
				handleTextChange={handleTextChange}
				reason={reason}
				onSubmitForm={onSubmitForm}
			/>
		</div>
	);
};

export default AdminView;
