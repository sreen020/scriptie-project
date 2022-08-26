import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import PatientCard from '../components/PatientCard';

const Expert = () => {
	const [patientList, setPatientList] = useState([]);
	const [filteredPatients, setFilteredPatients] = useState([]);
	const db = getFirestore();
	const colRef = collection(db, 'patients');

	useEffect(() => {
		getDocs(colRef)
			.then((snapshot) => {
				let patients = [];

				snapshot.docs.forEach((doc) => {
					patients.push({ ...doc.data(), id: doc.id });
				});

				setPatientList(patients);
				setFilteredPatients(patients);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const addData = () => {
		addDoc(colRef, {
			firstname: 'aaaaa',
			lastname: 'bbbbbb',
			age: 74,
			sex: 'm',
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			exercises: [
				{
					id: 0,
					name: 'Leg Curls',
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
					time_in_minutes: 2.1,
					category: 'leg',
				},
			],
			activity: [
				{
					date: '22-05-2022',
					id: 0,
					name: 'Leg Curls',
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
					time_in_minutes: 2.1,
					category: 'leg',
					feedback: {
						place: 'right_leg',
						difficulty: 6,
						pain: 3,
						description:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					},
				},
				{
					date: '27-05-2022',
					id: 1,
					name: 'Squats',
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
					time_in_minutes: 2.1,
					category: 'leg',
					feedback: {
						place: 'right_leg',
						difficulty: 6,
						pain: 3,
						description:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					},
				},
			],
		});
	};

	const searchPatients = (e) => {
		const value = e.target.value.toLowerCase();
		const filteredPatients = patientList.filter(
			(patient) =>
				patient.firstname.toLowerCase().includes(value) ||
				patient.lastname.toLowerCase().includes(value) ||
				patient.birth_date
					.replaceAll('-', '')
					.includes(value.replaceAll('-', ''))
		);
		setFilteredPatients(filteredPatients);
	};

	return (
		<main className="p-4 sm:p-12">
			<section className="flex flex-col sm:flex-row justify-between pb-12 gap-3">
				<div>
					<h1 className="text-center text-4xl font-black pb-4">
						Overzicht patiënten
					</h1>
					<p className="text-xl text-primary-yellow font-medium">
						{filteredPatients.length === 1
							? `${filteredPatients.length} patient`
							: `${filteredPatients.length} patienten`}
					</p>
				</div>
				<input
					className="mt-2 w-full sm:w-52 py-4 text-formtext shadow-form bg-white border-0 rounded-md px-4 h-fit text-xs"
					type="text"
					name="search-patient"
					id="search-patient"
					placeholder="Zoek patiënt..."
					onChange={searchPatients}
				/>
			</section>
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredPatients ? (
					filteredPatients.map((patient) => (
						<Link to={`/patients/${patient.id}`} key={patient.id}>
							<PatientCard
								name={`${patient.firstname} ${patient.lastname}`}
								birthDate={patient.birth_date}
							/>
						</Link>
					))
				) : (
					<p>No data</p>
				)}
				{filteredPatients.length < 1 && (
					<div className="col-span-3 text-center">
						<img
							className="mx-auto w-52"
							src="/img/not-found.svg"
							alt="Not found image"
						/>
						<h3 className="text-xl font-bold text-text-color">
							Geen patiënten gevonden
						</h3>
						<p>
							Voeg patiënten toe door een account te genereren voor deze
							applicatie
						</p>
					</div>
				)}
			</section>

			{/* <button onClick={addData}>ADD DATA</button> */}
		</main>
	);
};

export default Expert;
