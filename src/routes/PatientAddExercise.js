import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	doc,
	getDocs,
	getDoc,
	getFirestore,
	updateDoc,
	collection,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import ExerciseCard from '../components/ExerciseCard';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const PatientAddExercise = () => {
	const db = getFirestore();
	const { patientId } = useParams();
	const patientDocRef = doc(db, 'patients', patientId);
	const excerciseColRef = collection(db, 'exercises');
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState('one');
	const [patientInfo, setPatientInfo] = useState([]);
	const [exercises, setExercises] = useState([]);
	const [filteredExercises, setFilteredExercises] = useState(exercises);

	useEffect(() => {
		getDoc(patientDocRef).then((doc) => {
			setPatientInfo(doc.data());
		});

		getDocs(excerciseColRef)
			.then((snapshot) => {
				let items = [];

				snapshot.docs.forEach((doc) => {
					items.push({ ...doc.data(), id: doc.id });
				});

				setExercises(items);
				setFilteredExercises(items);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	useEffect(() => {
		const removeSelected = exercises.filter(
			(exercises) =>
				!patientInfo.exercises.find((selected) => selected.id === exercises.id)
		);

		setFilteredExercises(removeSelected);
	}, [exercises]);

	const handleAddButton = (e, exercise) => {
		e.stopPropagation();
		updateDoc(patientDocRef, {
			exercises: arrayUnion(exercise),
		}).then(navigate(`../patients/${patientId}`, { replace: true }));
	};

	const handleRemoveButton = (e, exercise) => {
		e.stopPropagation();
		updateDoc(patientDocRef, {
			exercises: arrayRemove(exercise),
		}).then(navigate(`../patients/${patientId}`, { replace: true }));
	};

	const setSwitchButton = (num) => {
		setActiveTab(num);
	};

	let FilterButtonCategories = [];
	const filterButtons = (exercises) => {
		exercises.map((item) => {
			FilterButtonCategories.push(item.category);
		});

		FilterButtonCategories = [...new Set(FilterButtonCategories)];
	};

	const filterExerciseOnCategory = (categoryName) => {
		const filteredResults = exercises.filter(
			(exercise) => exercise.category === categoryName
		);

		setFilteredExercises(filteredResults);
	};

	return (
		<main className="p-4 sm:p-12">
			<BackButton
				customRoute={() =>
					navigate(`../patients/${patientId}`, { replace: true })
				}
			/>
			<section className="flex flex-col sm:flex-row justify-between pb-12 gap-3">
				<div>
					<h1 className="text-center text-4xl font-black pb-4">
						Wijzig oefeningen
					</h1>
					<p className="text-xl text-primary-yellow font-medium">
						{patientInfo.firstname} {patientInfo.lastname}
					</p>
				</div>
				<div className="flex items-center col-span-2">
					<button
						onClick={() => setSwitchButton('one')}
						className={
							activeTab === 'one'
								? 'flex justify-center items-center rounded-r-none gap-1 text-white bg-primary-blue py-3 px-12 rounded-md  border-primary-blue  border-2 font-medium text-sm h-fit outline-none'
								: 'flex justify-center items-center gap-1 text-primary-blue bg-transparent border-primary-blue py-3 px-12 rounded-md hover:bg-primary-violet-hover  border-2 hover:text-primary-blue duration-200 font-medium text-sm h-fit rounded-r-none border-r-0 outline-none'
						}
					>
						Nieuwe oefeningen
					</button>

					<button
						onClick={() => setSwitchButton('two')}
						className={
							activeTab === 'two'
								? 'flex justify-center items-center rounded-l-none gap-1 text-white bg-primary-blue py-3 px-12 rounded-md  border-primary-blue  border-2 font-medium text-sm h-fit outline-none'
								: 'flex justify-center items-center gap-1 text-primary-blue bg-transparent border-primary-blue py-3 px-12 rounded-md hover:bg-primary-violet-hover  border-2 hover:text-primary-blue duration-200 font-medium text-sm h-fit rounded-l-none  outline-none'
						}
					>
						Huidige oefeningen
					</button>
				</div>
			</section>
			{activeTab === 'one' ? (
				<>
					<div className="flex gap-4 pb-10">
						{exercises.length > 0 && filterButtons(exercises)}

						<input
							type="radio"
							id="clear"
							name="filter-buttons"
							value="clear-filter"
							className="filter-radio"
						/>
						<label
							onClick={() => setFilteredExercises(exercises)}
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
					<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{exercises ? (
							filteredExercises.map((exercise) => (
								<ExerciseCard
									data={exercise}
									button
									action={(e) => handleAddButton(e, exercise)}
									key={exercise.id}
								/>
							))
						) : (
							<p>No data</p>
						)}
						{exercises.length < 1 && (
							<div className="col-span-4 text-center">
								<img
									className="mx-auto w-52"
									src="/img/not-found.svg"
									alt="Not found"
								/>
								<h3 className="text-xl font-bold text-text-color">
									Geen Oefeningen gevonden
								</h3>
								<p>Pas je zoekcriteria aan om oefeningen te vinden</p>
							</div>
						)}
					</section>
				</>
			) : (
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{patientInfo.exercises ? (
						patientInfo.exercises.map((exercise) => (
							<ExerciseCard
								data={exercise}
								removeButton
								action={(e) => handleRemoveButton(e, exercise)}
								key={exercise.id}
							/>
						))
					) : (
						<div className="col-span-4 text-center">
							<img
								className="mx-auto w-52"
								src="/img/not-found.svg"
								alt="Not found"
							/>
							<h3 className="text-xl font-bold text-text-color">
								Geen Oefeningen gevonden
							</h3>
							<p>Pas je zoekcriteria aan om oefeningen te vinden</p>
						</div>
					)}
				</section>
			)}
		</main>
	);
};

export default PatientAddExercise;
