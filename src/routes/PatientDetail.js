import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const PatientDetail = () => {
	const [patientInfo, setPatientInfo] = useState([]);
	const { patientId } = useParams();
	const db = getFirestore();
	const docRef = doc(db, 'patients', patientId);

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setPatientInfo(doc.data());
		});
	}, []);

	console.log(patientInfo);

	return (
		<div>
			<h1>
				{patientInfo.firstname} {patientInfo.lastname}
			</h1>
			<p>{patientInfo.age} jaar</p>
			<p>Geslacht: {patientInfo.sex === 'm' ? 'Man' : 'Vrouw'}</p>

			<p>Notities</p>
			<p>{patientInfo.description}</p>

			<p>Exercises</p>
			{patientInfo.exercises?.map((exercise) => (
				<article key={exercise.id} className="bg-primary-violet">
					<h3>{exercise.name}</h3>
					<p>{exercise.description}</p>
					<p>{exercise.time_in_minutes} minuten</p>
					<p>{exercise.category}</p>
				</article>
			))}
		</div>
	);
};

export default PatientDetail;
