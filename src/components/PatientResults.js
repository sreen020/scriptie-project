import React, { useEffect, useState } from 'react';
import {
	doc,
	getDocs,
	getFirestore,
	updateDoc,
	collection,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import ModalContent from './ModalContent';

const PatientResults = ({ data }) => {
	const { patientId } = useParams();
	const db = getFirestore();
	const colRef = collection(db, 'patients', 'W4G8NUCGSerost6xfJlA', 'activity');
	const [results, setResults] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		getDocs(colRef)
			.then((snapshot) => {
				let items = [];

				snapshot.docs.forEach((doc) => {
					items.push({ ...doc.data().data });
				});

				items.sort(function (a, b) {
					return b.date
						.split('-')
						.reverse()
						.join('-')
						.localeCompare(a.date.split('-').reverse().join('-'));
				});

				setResults(items);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const handleClose = () => {
		setModalIsOpen(false);
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
		},
	};

	return (
		<section>
			{results.length > 0 &&
				results.map((item) => (
					<article
						onClick={item.body_parts ? openModal : undefined}
						className="border-t py-3 flex justify-between items-center"
					>
						<div>
							<p className="text-primary-yellow font-black">{item.date}</p>
							<p className="text-text-light text-xl">{item.name}</p>
						</div>
						{item.body_parts ? (
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
							style={customStyles}
							onRequestClose={handleClose}
						>
							<ModalContent handleClose={handleClose} data={item} />
						</Modal>
					</article>
				))}
		</section>
	);
};

export default PatientResults;
