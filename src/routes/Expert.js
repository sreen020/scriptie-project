import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, addDoc } from 'firebase/firestore';
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

	const addData = () => {
		// addDoc(colRef, {
		// 	firstname: 'Jane',
		// 	lastname: 'Roe',
		// 	age: 74,
		// 	sex: 'm',
		// 	description:
		// 		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 	exercises: [
		// 		{
		// 			id: 0,
		// 			name: 'Leg Curls',
		// 			description:
		// 				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 			video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
		// 			time_in_minutes: 2.1,
		// 			category: 'leg',
		// 		},
		// 	],
		// 	activity: [
		// 		{
		// 			date: '22-05-2022',
		// 			id: 0,
		// 			name: 'Leg Curls',
		// 			description:
		// 				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 			video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
		// 			time_in_minutes: 2.1,
		// 			category: 'leg',
		// 			feedback: {
		// 				place: 'right_leg',
		// 				difficulty: 6,
		// 				pain: 3,
		// 				description:
		// 					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 			},
		// 		},
		// 		{
		// 			date: '27-05-2022',
		// 			id: 1,
		// 			name: 'Squats',
		// 			description:
		// 				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 			video: 'https://www.youtube.com/watch?v=8uUBCewYXCw',
		// 			time_in_minutes: 2.1,
		// 			category: 'leg',
		// 			feedback: {
		// 				place: 'right_leg',
		// 				difficulty: 6,
		// 				pain: 3,
		// 				description:
		// 					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		// 			},
		// 		},
		// 	],
		// });
	};

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

			<button onClick={addData}>ADD DATA</button>
		</div>
	);
};

export default Expert;
