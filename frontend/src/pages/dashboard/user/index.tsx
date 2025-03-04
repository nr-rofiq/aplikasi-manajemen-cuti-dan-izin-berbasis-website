import { useState } from "react";
import UserView from "./View";

interface DateRange {
	start: Date | null;
	end: Date | null;
}

const Login = () => {
	const [chooseDate, setChooseDate] = useState<DateRange>({
		start: null,
		end: null,
	});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [isType, setIsType] = useState<boolean>(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleDateChange = (date: Date | null, type: string) => {
		setChooseDate((prev) => ({
			...prev,
			[type]: date,
		}));
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
				isModal={isModalOpen}
				isType={isType}
				start={chooseDate.start}
				end={chooseDate.end}
				selectedValue={selectedValue}
				handleDateChange={handleDateChange}
				openModal={openModal}
				closeModal={closeModal}
				handleClick={handleClick}
				handleItemClick={handleItemClick}
				colorPill={colorPill}
			/>
		</div>
	);
};

export default Login;
