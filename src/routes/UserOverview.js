import React from 'react';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import ExerciseCard from '../components/ExerciseCard';

const UserOverview = () => {
	const db = getFirestore();
	const docRef = doc(db, 'patients', 'W4G8NUCGSerost6xfJlA');
	const [userInfo, setUserInfo] = useState([]);
	const [FilteredExercises, setFilteredExercises] = useState([]);

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setUserInfo(doc.data());
			setFilteredExercises(doc.data().exercises);
		});
	}, []);

	let FilterButtonCategories = [];

	const filterButtons = (exercises) => {
		exercises.map((item) => {
			FilterButtonCategories.push(item.category);
		});

		FilterButtonCategories = [...new Set(FilterButtonCategories)];
	};

	const filterExerciseOnCategory = (categoryName) => {
		const filteredResults = userInfo.exercises.filter(
			(exercise) => exercise.category === categoryName
		);

		setFilteredExercises(filteredResults);
	};

	return (
		<main className="p-4 sm:p-12">
			<section className="pb-5">
				<div>
					<h1 className="text-4xl font-black">Welkom {userInfo.firstname}</h1>
				</div>
			</section>

			<section className="pb-4">
				<div className="flex justify-between items-center">
					<h2 className="text-primary-blue text-title font-medium pb-3">
						Oefeningen van deze week
					</h2>
					<p>progress bar</p>
				</div>
			</section>

			{/* ------------------------------------------------------------------ */}

			<div className="flex gap-4 pb-10">
				{userInfo.exercises && filterButtons(userInfo.exercises)}

				<input
					type="radio"
					id="clear"
					name="filter-buttons"
					value="clear-filter"
					className="filter-radio"
				/>
				<label
					onClick={() => setFilteredExercises(userInfo.exercises)}
					htmlFor="clear"
					className='className="flex justify-center items-center py-3 px-8 rounded-md hover:bg-primary-blue-hover text-text-light bg-mainGray duration-200 font-medium outline-none"'
				>
					Geen filter
				</label>

				{FilterButtonCategories.map((item) => (
					<div key={item}>
						<input
							className="filter-radio"
							type="radio"
							id={item}
							name="filter-buttons"
							value={item}
						/>
						<label
							onClick={() => filterExerciseOnCategory(item)}
							htmlFor={item}
							className="capitalize flex justify-center items-center py-3 px-8 rounded-md hover:bg-primary-blue-hover text-text-light bg-mainGray duration-200 font-medium outline-none"
						>
							{item}
						</label>
					</div>
				))}
			</div>
			{/* ------------------------------------------------------------------ */}
			<section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{FilteredExercises &&
					FilteredExercises.map((item) => (
						<ExerciseCard data={item} key={item.id} />
					))}
			</section>
		</main>
	);
};

export default UserOverview;
