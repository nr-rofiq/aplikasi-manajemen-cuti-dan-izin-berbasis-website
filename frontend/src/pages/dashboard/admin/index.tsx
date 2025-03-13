import AdminView from "./View";
import { useMutation, useQuery } from "@tanstack/react-query";
import { approvalService, historyApprovalService } from "../../../api/service";
import { FormEvent, useState } from "react";

const Login = () => {
	const [selectedCuti, setSelectedCuti] = useState<{
		id: number;
		nama: string;
		start: Date;
		end: Date;
		duration: number;
		type: string;
		status: string;
		reason: string;
		rejectedReason: string;
	} | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<{
		approval: boolean;
		detail: boolean;
	}>({
		approval: false,
		detail: false,
	});
	const [isType, setIsType] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [reason, setReason] = useState<string>("");

	const {
		data: historyApproval,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["approval"],
		queryFn: historyApprovalService,
	});

	const approvalCutiMutation = useMutation({
		mutationFn: ({
			id,
			status,
			reason,
		}: {
			id: number;
			status: string;
			reason: string;
		}) => approvalService(id, status, reason),
		onSuccess: () => {
			alert("Cuti berhasil disetujui!");
		},
		onError: (error) => {
			console.error("Persetujuan gagal:", error);
		},
	});

	const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!selectedCuti?.id || !selectedValue) {
				throw new Error("ID cuti atau status tidak boleh kosong!");
			}

			const approvalData = {
				id: selectedCuti.id,
				status: selectedValue,
				reason: reason,
			};

			await approvalCutiMutation.mutateAsync(approvalData);
			refetch();
		} catch (error) {
			console.error("Error Persetujuan Cuti: ", error);
		} finally {
			setIsModalOpen((prev) => ({ ...prev, approval: false }));
		}
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReason(e.target.value);
	};

	const openApprovalModal = () =>
		setIsModalOpen((prev) => ({ ...prev, approval: true }));
	const openDetailModal = () =>
		setIsModalOpen((prev) => ({ ...prev, detail: true }));
	const closeApprovalModal = () =>
		setIsModalOpen((prev) => ({ ...prev, approval: false }));
	const closeDetailModal = () =>
		setIsModalOpen((prev) => ({ ...prev, detail: false }));

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsType(!isType);
	};

	const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const value = e.currentTarget.getAttribute("value");
		setSelectedValue(value);
		setIsType(!isType);
	};

	const format = (date: Date) =>
		date.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		});

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

	return (
		<div>
			<AdminView
				format={format}
				colorPill={colorPill}
				historyApproval={historyApproval}
				isPending={isPending}
				setSelectedCuti={setSelectedCuti}
				selectedCuti={selectedCuti}
				openApprovalModal={openApprovalModal}
				openDetailModal={openDetailModal}
				closeApprovalModal={closeApprovalModal}
				closeDetailModal={closeDetailModal}
				approvalModal={isModalOpen.approval}
				detailModal={isModalOpen.detail}
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

export default Login;
