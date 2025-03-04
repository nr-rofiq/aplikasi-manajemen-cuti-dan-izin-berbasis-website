import { useEffect, useState } from "react";
import AdminView from "./View";

type OpenKey = "status" | "date";
interface DateRange {
	start: Date | null;
	end: Date | null;
}

const Login = () => {
	const [chooseDate, setChooseDate] = useState<DateRange>({
		start: null,
		end: null,
	});
	const [isOpen, setIsOpen] = useState<{ status: boolean; date: boolean }>({
		status: false,
		date: false,
	});
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const handleDateChange = (update: [Date | null, Date | null]) => {
		const [start, end] = update;
		setChooseDate({
			start,
			end,
		});
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const open = e.currentTarget.id as OpenKey;
		setIsOpen((prev) => ({
			...prev,
			[open]: !prev[open],
		}));
	};

	const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const value = e.currentTarget.getAttribute("value");
		setSelectedValue(value);
		setIsOpen((prev) => ({
			...prev,
			status: !isOpen.status,
		}));
	};

	const format = (date: Date) =>
		date.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		});

	useEffect(() => {
		if (chooseDate.end) {
			setIsOpen((prev) => ({ ...prev, date: false }));
		}
	}, [chooseDate.end]);

	return (
		<div>
			<AdminView
				start={chooseDate.start}
				end={chooseDate.end}
				status={isOpen.status}
				date={isOpen.date}
				selectedValue={selectedValue}
				handleDateChange={handleDateChange}
				handleClick={handleClick}
				handleItemClick={handleItemClick}
				format={format}
			/>
		</div>
	);
};

export default Login;
