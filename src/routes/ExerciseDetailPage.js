import React, { useEffect, useState } from 'react';
import {
	doc,
	getDoc,
	getFirestore,
	updateDoc,
	collection,
	getDocs,
} from 'firebase/firestore';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ExerciseCard from '../components/ExerciseCard';

const ExerciseDetailPage = () => {
	let navigate = useNavigate();
	const [exerciseInfo, setExerciseInfo] = useState([]);
	const [allExercises, setAllExercises] = useState([]);
	const [relatedExercises, setRelatedExercises] = useState([]);
	const { exerciseId } = useParams();
	const db = getFirestore();
	const docRef = doc(db, 'exercises', exerciseId);
	const excercisesColRef = collection(db, 'exercises');

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setExerciseInfo(doc.data());
		});

		getDocs(excercisesColRef)
			.then((snapshot) => {
				let items = [];

				snapshot.docs.forEach((doc) => {
					items.push({ ...doc.data(), id: doc.id });
				});

				setAllExercises(items);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [exerciseId]);

	const getRelatedExercises = () => {
		const filteredResults = allExercises.filter(
			(exercise) =>
				exercise.category === exerciseInfo.category &&
				exercise.name !== exerciseInfo.name
		);

		return filteredResults;
	};

	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<main className="p-4 sm:p-12">
			<section className="pb-12">
				<h1 className="text-4xl font-black pb-4">{exerciseInfo.name}</h1>
			</section>
			<section className="grid grid-cols-1 sm:grid-cols-2 pb-12">
				<YouTube videoId="0tn5K9NlCfo" opts={opts} />
				<div className="grid gap-8 px-10">
					<h2 className="text-text-light font-bold text-xl">
						Uitleg {exerciseInfo.name}
					</h2>

					<p className="text-text-light max-w-lg">{exerciseInfo.description}</p>
					<p className="text-text-light max-w-lg">{exerciseInfo.explanation}</p>
					<div>
						<Button
							type="primary"
							text="Start oefening"
							icon
							action={() => navigate(`/start/${exerciseId}`, { replace: true })}
						/>
					</div>
				</div>
			</section>

			<section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<h2 className="font-bold text-xl col-span-3">
					Soortgelijke oefeningen
				</h2>
				{getRelatedExercises().map((item) => (
					<ExerciseCard data={item} key={item} />
				))}
			</section>
		</main>
	);
};

export default ExerciseDetailPage;
