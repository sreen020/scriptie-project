import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, getFirestore, collection } from 'firebase/firestore';
import ExerciseCard from '../components/ExerciseCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const RecommendedExercises = () => {
	let navigate = useNavigate();
	const { category } = useParams();
	const db = getFirestore();
	const excercisesColRef = collection(db, 'exercises');
	const [allExercises, setAllExercises] = useState([]);

	useEffect(() => {
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
	}, []);

	const getRelatedExercises = () => {
		const filteredResults = allExercises.filter(
			(exercise) => exercise.category === category
		);

		return filteredResults;
	};

	return (
		<main className="p-4 sm:p-12">
			<section className="pb-12">
				<h1 className="text-4xl font-black pb-4 text-primary-blue">
					Bedankt voor het delen
				</h1>
				<p className="text-text-light max-w-lg">
					Hieronder vindt u uw aanbevolen oefeningen van vandaag en een aantal
					soortgelijke oefeningen. U kunt er ook voor kiezen om terug te gaan
					naar het overzicht.
				</p>
			</section>

			<section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-16">
				<h2 className="font-bold text-xl col-span-3">
					Soortgelijke oefeningen
				</h2>
				{getRelatedExercises().map((item, index) => (
					<ExerciseCard data={item} key={index} />
				))}
			</section>

			<section className="flex justify-end">
				<Button
					text="Terug naar overzicht"
					type="primary"
					icon
					action={() => navigate(`/overview`, { replace: true })}
				/>
			</section>
		</main>
	);
};

export default RecommendedExercises;
