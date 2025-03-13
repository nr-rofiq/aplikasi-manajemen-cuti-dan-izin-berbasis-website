import DatePicker from "react-datepicker";
import Modal from "../Modal/Modal";

interface ModalDetail {
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
	detailModal: boolean;
	colorPill: (
		type: string
	) =>
		| "bg-green-200 text-green-600"
		| "bg-yellow-200 text-yellow-600"
		| "bg-red-200 text-red-600"
		| null;
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
	closeDetailModal: () => void;
}

export const ModalDetail = ({
	selectedCuti,
	detailModal,
	colorPill,
	setSelectedCuti,
	closeDetailModal,
}: ModalDetail) => {
	return (
		selectedCuti && (
			<Modal isOpen={detailModal}>
				<div>
					<div className="space-y-1 flex justify-between border-b pb-4 mb-4">
						<h2 className="text-2xl cursor-default font-bold leading-tight tracking-tight">
							Detail Pengajuan Cuti
						</h2>
						<p
							className={`font-bold px-2 py-1 rounded-md text-sm ${colorPill(
								selectedCuti.status
							)}`}
						>
							{selectedCuti.status}
						</p>
					</div>
					<form className="space-y-4">
						<div>
							<div className="flex relative gap-1 flex-1 flex-col">
								<p className="block mb-2 text-sm font-medium text-gray-900">
									Nama
								</p>
								<input
									className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									disabled
									value={selectedCuti.nama}
								/>
							</div>
						</div>
						<div>
							<div className="flex relative gap-1 flex-1 flex-col">
								<p className="block mb-2 text-sm font-medium text-gray-900">
									Jenis Cuti
								</p>
								<button
									className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									type="button"
									disabled
								>
									{selectedCuti.type}
								</button>
							</div>
						</div>
						<div className="flex justify-between">
							<div>
								<p className="block mb-2 text-sm font-medium text-gray-900">
									Tanggal Mulai
								</p>
								<DatePicker
									className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									value={selectedCuti.start.toLocaleDateString("id-ID")}
									disabled
								/>
							</div>
							<div>
								<p className="block mb-2 text-sm font-medium text-gray-900">
									Tanggal Berakhir
								</p>
								<DatePicker
									className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									value={selectedCuti.end.toLocaleDateString("id-ID")}
									disabled
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
								value={selectedCuti.reason}
								wrap="true"
								disabled
							/>
						</div>
						{selectedCuti.status == "Ditolak" && (
							<div>
								<label
									className="block mb-2 text-sm font-medium text-gray-900"
									htmlFor="reason"
								>
									Alasan Ditolak
								</label>
								<textarea
									className="bg-gray-50 w-full focus:ring border rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
									name="reason"
									placeholder="Alasan Ditolak"
									value={selectedCuti.rejectedReason}
									wrap="true"
									disabled
								/>
							</div>
						)}
						{selectedCuti.status == "Disetujui" && (
							<div>
								<label
									className="block mb-2 text-sm font-medium text-gray-900"
									htmlFor="jumlah cuti"
								>
									Jumlah Cuti Disetujui
								</label>
								<input
									className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start w-full block p-2"
									type="text"
									name="jumlah cuti"
									disabled
									value={selectedCuti.duration}
								/>
							</div>
						)}

						<div className="flex justify-end items-end gap-2">
							<button
								className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:opacity-30"
								onClick={() => {
									closeDetailModal();
									setSelectedCuti(null);
								}}
							>
								Tutup
							</button>
						</div>
					</form>
				</div>
			</Modal>
		)
	);
};
