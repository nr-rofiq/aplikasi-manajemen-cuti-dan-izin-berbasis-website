import { FormEvent, useState } from "react";
import UserView from "./View";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCutiService, historyCutiService } from "../../../api/service";
import { useAuth } from "../../../auth";

interface DateRange {
	start: Date | null;
	end: Date | null;
}

interface Modal {
	add: boolean;
	detail: boolean;
}

const Login = () => {
	const [selectedCuti, setSelectedCuti] = useState<{
		date: Date;
		type: string;
		duration: number;
		status: string;
		alasan: string;
		alasanDitolak: string;
	} | null>(null);
	const [chooseDate, setChooseDate] = useState<DateRange>({
		start: null,
		end: null,
	});
	const [isModalOpen, setIsModalOpen] = useState<Modal>({
		add: false,
		detail: false,
	});
	const [reason, setReason] = useState<string>("");
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [isType, setIsType] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const { data } = useAuth();

	const addCutiMutation = useMutation({
		mutationFn: ({
			id_jenis_cuti,
			start_date,
			end_date,
			alasan,
		}: {
			id_jenis_cuti: string;
			start_date: string;
			end_date: string;
			alasan: string;
		}) => addCutiService(id_jenis_cuti, start_date, end_date, alasan),
		onSuccess: () => {
			alert("Pengajuan cuti berhasil dibuat!");
		},
		onError: (error) => {
			console.error("Pengajuan cuti gagal:", error);
		},
	});

	const {
		data: historyData,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["history"],
		queryFn: historyCutiService,
	});

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const addCutiData = {
				id_jenis_cuti: selectedValue ?? "",
				start_date: chooseDate.start?.toISOString().split("T")[0] || "",
				end_date: chooseDate.end?.toISOString().split("T")[0] || "",
				alasan: reason,
			};

			await addCutiMutation.mutateAsync(addCutiData);
			refetch();
		} catch (error) {
			console.error("Error Pengajuan Cuti: ", error);
		} finally {
			setIsSubmitting(false);
			setIsModalOpen((prev) => ({ ...prev, add: false }));
		}
	};

	const convertTypeCuti = (type: string | null) => {
		switch (type) {
			case "C01":
				return "Cuti Tahunan";
			case "C02":
				return "Cuti Besar";
			case "C03":
				return "Cuti Sakit";
			case "C04":
				return "Cuti Melahirkan";
			case "C05":
				return "Cuti Alasan Penting";
			default:
				break;
		}
	};

	const openAddModal = () => setIsModalOpen((prev) => ({ ...prev, add: true }));
	const openDetailModal = () =>
		setIsModalOpen((prev) => ({ ...prev, detail: true }));
	const closeAddModal = () =>
		setIsModalOpen((prev) => ({ ...prev, add: false }));
	const closeDetailModal = () =>
		setIsModalOpen((prev) => ({ ...prev, detail: false }));

	const handleDateChange = (date: Date | null, type: string) => {
		setChooseDate((prev) => ({
			...prev,
			[type]: date,
		}));
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReason(e.target.value);
	};

	const colorPill = (type: string) => {
		switch (type) {
			case "Disetujui":
				return "bg-green-200 text-green-600";
			case "Menunggu":
				return "bg-yellow-200 text-yellow-600";
			case "Ditolak":
				return "bg-red-200 text-red-600";
			default:
				return null;
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsType(!isType);
	};

	const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const value = e.currentTarget.getAttribute("value");
		setSelectedValue(value);
		setIsType(!isType);
	};

	return (
		<div>
			<UserView
				addModal={isModalOpen.add}
				detailModal={isModalOpen.detail}
				isType={isType}
				start={chooseDate.start}
				end={chooseDate.end}
				selectedValue={selectedValue}
				openAddModal={openAddModal}
				openDetailModal={openDetailModal}
				closeAddModal={closeAddModal}
				closeDetailModal={closeDetailModal}
				handleDateChange={handleDateChange}
				handleClick={handleClick}
				handleItemClick={handleItemClick}
				colorPill={colorPill}
				selectedCuti={selectedCuti}
				setSelectedCuti={setSelectedCuti}
				convertTypeCuti={convertTypeCuti}
				isSubmitting={isSubmitting}
				handleTextChange={handleTextChange}
				reason={reason}
				onFormSubmit={onFormSubmit}
				historyData={historyData}
				isPending={isPending}
				name={data?.nama}
			/>
		</div>
	);
};

export default Login;
