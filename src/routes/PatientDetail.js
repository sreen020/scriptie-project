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

	return (
		<div>
			<h1>
				{patientInfo.firstname} {patientInfo.lastname}
			</h1>
			<p>Leeftijd: {patientInfo.age}</p>
			<p>Geslacht: {patientInfo.sex === 'm' ? 'Man' : 'Vrouw'}</p>
		</div>
	);
};

export default PatientDetail;
