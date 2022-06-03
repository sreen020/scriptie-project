import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Expert = () => {
	const [patientList, setPatientList] = useState([]);
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
				console.log('this', patients);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<div>
			<h1>Expert</h1>
			<section className="flex">
				{patientList ? (
					patientList.map((patient) => (
						<Link to={`/patients/${patient.id}`} key={patient.id}>
							<article>
								<h4>
									{patient.firstname} {patient.lastname}
								</h4>
							</article>
						</Link>
					))
				) : (
					<p>No data</p>
				)}
			</section>
		</div>
	);
};

export default Expert;
