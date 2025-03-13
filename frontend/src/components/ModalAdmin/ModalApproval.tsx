import DatePicker from "react-datepicker";
import Modal from "../Modal/Modal";
import { approvalData } from "../../data/dummy";
import { FormEvent } from "react";

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
	approvalModal: boolean;
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
	closeApprovalModal: () => void;
	selectedValue: string | null;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
	isType: boolean;
	setSelectedValue: React.Dispatch<string>;
	handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	reason: string;
	onSubmitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ModalApproval = ({
	selectedCuti,
	approvalModal,
	colorPill,
	setSelectedCuti,
	closeApprovalModal,
	handleClick,
	handleItemClick,
	selectedValue,
	isType,
	setSelectedValue,
	handleTextChange,
	reason,
	onSubmitForm,
}: ModalDetail) => {
	return (
		selectedCuti && (
			<Modal isOpen={approvalModal}>
				<div>
					<div className="space-y-1 flex justify-between border-b pb-4 mb-4">
						<h2 className="text-2xl cursor-default font-bold leading-tight tracking-tight">
							Persetujuan Cuti
						</h2>
						<p
							className={`font-bold px-2 py-1 rounded-md text-sm ${colorPill(
								selectedCuti.status
							)}`}
						>
							{selectedCuti.status}
						</p>
					</div>
					<form className="space-y-4" onSubmit={onSubmitForm}>
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
						<hr className="border-b-2" />
						<div className="flex relative gap-1 flex-1 flex-col">
							<p className="block mb-2 text-sm font-medium text-gray-900">
								Approval
							</p>
							<button
								className="bg-gray-50 border focus:ring rounded-md border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 text-start block p-2"
								type="button"
								onClick={handleClick}
							>
								{selectedValue ? selectedValue : "Jenis Cuti"}
							</button>

							{isType && (
								<div className="absolute z-20 w-full top-20 shadow-sm">
									<ul className="py-2 text-sm cursor-pointer bg-indigo-800 rounded-md text-white">
										{approvalData.map((data: { type: string }, id: number) => (
											<li
												className="block px-2 py-2 hover:bg-indigo-900"
												value={data.type}
												onClick={handleItemClick}
												key={id}
											>
												{data.type}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
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
								wrap="true"
								value={reason}
								onChange={handleTextChange}
							/>
						</div>
						<div className="flex justify-end items-end gap-2">
							<button
								className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:opacity-30"
								onClick={() => {
									closeApprovalModal();
									setSelectedCuti(null);
									setSelectedValue("");
								}}
							>
								Tutup
							</button>
							<button
								className="bg-indigo-800 cursor-pointer w-1/3 text-white px-4 py-2 rounded-md hover:bg-indigo-900"
								type="submit"
							>
								Setujui
							</button>
						</div>
					</form>
				</div>
			</Modal>
		)
	);
};
