import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalContent from './ModalContent';

const ResultListItem = ({ data }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen);
		console.log('toggle', modalIsOpen);
	};

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			zIndex: '20',
			padding: '30px 50px',
		},
	};

	return (
		<article
			onClick={data.body_parts ? toggleModal : undefined}
			className="border-t py-3 flex justify-between items-center"
		>
			<div>
				<p className="text-primary-yellow font-black">{data.date}</p>
				<p className="text-text-light text-xl">{data.name}</p>
			</div>
			{data.body_parts ? (
				<svg
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>
			) : null}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => toggleModal()}
				style={customStyles}
				ariaHideApp={false}
			>
				<ModalContent handleClose={toggleModal} data={data} />
			</Modal>
		</article>
	);
};

export default ResultListItem;
