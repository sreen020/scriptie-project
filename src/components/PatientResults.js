import React, { useEffect, useState } from 'react';
import {
	doc,
	getDocs,
	getFirestore,
	updateDoc,
	collection,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ResultListItem from './ResultListItem';

const PatientResults = ({ data }) => {
	const { patientId } = useParams();
	const db = getFirestore();
	const colRef = collection(db, 'patients', 'W4G8NUCGSerost6xfJlA', 'activity');
	const [results, setResults] = useState([]);

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

	return (
		<section>
			{results.length > 0 &&
				results.map((item, index) => (
					<ResultListItem data={item} key={index} />
				))}
		</section>
	);
};

export default PatientResults;
