import DatePicker from "react-datepicker";
import Modal from "../Modal/Modal";
import { dropdownData } from "../../data/dummy";
import { FormEvent } from "react";

interface ModalAdd {
	addModal: boolean;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
	selectedValue: string | null;
	isType: boolean;
	start: Date | null;
	end: Date | null;
	handleDateChange: (date: Date | null, type: string) => void;
	closeAddModal: () => void;
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

export const ModalAdd = ({
	addModal,
	handleClick,
	handleItemClick,
	selectedValue,
	isType,
	start,
	end,
	handleDateChange,
	closeAddModal,
	convertTypeCuti,
	isSubmitting,
	handleTextChange,
	reason,
	onFormSubmit,
}: ModalAdd) => {
	return (
		<Modal isOpen={addModal}>
			<div>
				<div className="space-y-1 border-b pb-4 mb-4">
					<h2 className="text-xl cursor-default font-bold leading-tight tracking-tight">
						Form Pengajuan Cuti
					</h2>
					<p className="text-gray-600 text-xs">
						Silahkan isi semua kolom yang diperlukan untuk mengajukan permohonan
						cuti.
					</p>
				</div>
				<form onSubmit={onFormSubmit}>
					<fieldset className="space-y-4" disabled={isSubmitting}>
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
									{convertTypeCuti(selectedValue) || "Jenis Cuti"}
								</button>

								{isType && (
									<div className="absolute z-20 w-full top-20 shadow-sm">
										<ul className="py-2 text-sm cursor-pointer bg-indigo-800 rounded-md text-white">
											{dropdownData.map(
												(data: { code: string; type: string }, id: number) => (
													<li
														className="block px-2 py-2 hover:bg-indigo-900"
														value={data.code}
														onClick={handleItemClick}
														key={id}
													>
														{data.type}
													</li>
												)
											)}
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
								value={reason}
								onChange={handleTextChange}
							/>
						</div>

						<div className="flex justify-end items-end gap-2">
							<button
								className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:opacity-30"
								onClick={closeAddModal}
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
					</fieldset>
				</form>
			</div>
		</Modal>
	);
};
