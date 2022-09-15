import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
							alt="Not found"
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
		</main>
	);
};

export default Expert;
