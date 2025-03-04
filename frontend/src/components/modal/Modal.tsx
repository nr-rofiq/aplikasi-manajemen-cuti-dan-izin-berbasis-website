import React from "react";

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg xl:w-1/3 lg:mx-0 mx-2">
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
