import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	doc,
	getDocs,
	getDoc,
	getFirestore,
	updateDoc,
	collection,
	addDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import ExerciseCard from '../components/ExerciseCard';
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
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const handleAddButton = (exercise) => {
		updateDoc(patientDocRef, {
			exercises: arrayUnion(exercise),
		}).then(navigate(`../patients/${patientId}`, { replace: true }));
	};

	const handleRemoveButton = (exercise) => {
		updateDoc(patientDocRef, {
			exercises: arrayRemove(exercise),
		}).then(navigate(`../patients/${patientId}`, { replace: true }));
	};

	const setSwitchButton = (num) => {
		setActiveTab(num);
	};

	return (
		<main className="p-4 sm:p-12">
			<header className="pb-4">
				<div
					onClick={() =>
						navigate(`../patients/${patientId}`, { replace: true })
					}
					className="cursor-pointer flex items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<p>Pagina terug</p>
				</div>
			</header>
			<section className="flex flex-col sm:flex-row justify-between pb-12 gap-3">
				<div>
					<h1 className='className="text-center text-4xl font-black pb-4"'>
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
						Alle oefeningen
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
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{exercises ? (
						exercises.map((exercise) => (
							<ExerciseCard
								key={exercise.id}
								name={exercise.name}
								desc={exercise.description}
								category={exercise.category}
								time={exercise.time}
								button
								action={() => handleAddButton(exercise)}
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
								alt="Not found image"
							/>
							<h3 className="text-xl font-bold text-text-color">
								Geen Oefeningen gevonden
							</h3>
							<p>Pas je zoekcriteria aan om oefeningen te vinden</p>
						</div>
					)}
				</section>
			) : (
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{patientInfo.exercises ? (
						patientInfo.exercises.map((exercise) => (
							<ExerciseCard
								key={exercise.id}
								name={exercise.name}
								desc={exercise.description}
								category={exercise.category}
								time={exercise.time}
								removeButton
								action={() => handleRemoveButton(exercise)}
							/>
						))
					) : (
						<div className="col-span-4 text-center">
							<img
								className="mx-auto w-52"
								src="/img/not-found.svg"
								alt="Not found image"
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
