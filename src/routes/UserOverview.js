import React from 'react';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import ExerciseCard from '../components/ExerciseCard';
import { useNavigate } from 'react-router-dom';

const UserOverview = () => {
	let navigate = useNavigate();
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
			<section className="pb-5 flex justify-between">
				<div>
					<h1 className="text-4xl font-black">Welkom {userInfo.firstname}</h1>
				</div>

				<article
					className="flex justify-center items-center flex-col cursor-pointer"
					onClick={() => navigate(`/progression`, { replace: false })}
				>
					<div className="bg-primary-blue rounded-full w-12 h-12 flex justify-center items-center">
						<svg viewBox="0 0 20 20" fill="#fff" className="w-6 h-6">
							<path
								fillRule="evenodd"
								d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<p className="font-bold text-sm pt-1">Mijn progressie</p>
				</article>
			</section>

			<section className="pb-4 grid-cols-2">
				<div className="flex justify-between items-center">
					<h2 className="text-primary-blue text-title font-medium pb-3">
						Oefeningen van deze week
					</h2>
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
