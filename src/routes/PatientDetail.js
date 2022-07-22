import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import PatientExercises from '../components/PatientExercises';
import PatientResults from '../components/PatientResults';
import { useNavigate } from 'react-router-dom';

const PatientDetail = () => {
	const [patientInfo, setPatientInfo] = useState([]);
	const [activeTab, setActiveTab] = useState('one');
	const [noteIsEditing, setNoteIsEditing] = useState(false);
	const [noteVal, setNoteVal] = useState('');
	const { patientId } = useParams();
	const db = getFirestore();
	const docRef = doc(db, 'patients', patientId);
	const navigate = useNavigate();

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setPatientInfo(doc.data());
			setNoteVal(doc.data().notes);
		});
	}, []);

	console.log(patientInfo);
	const setSwitchButton = (num) => {
		setActiveTab(num);
	};

	const editNotes = () => {
		setNoteIsEditing(true);
	};

	const updateNotes = (e) => {
		e.preventDefault();

		updateDoc(docRef, {
			notes: noteVal,
		}).then(setNoteIsEditing(false));
	};

	const navigateAddExcercise = () => {
		navigate(`../patients/${patientId}/nieuwe-oefening`, { replace: true });
	};

	return (
		<main className="p-4 sm:p-12">
			<header className="pb-4">
				<div
					onClick={() => navigate(-1)}
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
			<section className="grid grid-cols-3 pb-12 gap-3">
				<div>
					<h1 className='className="text-center text-4xl font-black pb-4"'>
						{patientInfo.firstname} {patientInfo.lastname}
					</h1>
					<p className="text-xl text-primary-yellow font-medium">
						{patientInfo.birth_date}
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
						Oefeningen
					</button>

					<button
						onClick={() => setSwitchButton('two')}
						className={
							activeTab === 'two'
								? 'flex justify-center items-center rounded-l-none gap-1 text-white bg-primary-blue py-3 px-12 rounded-md  border-primary-blue  border-2 font-medium text-sm h-fit outline-none'
								: 'flex justify-center items-center gap-1 text-primary-blue bg-transparent border-primary-blue py-3 px-12 rounded-md hover:bg-primary-violet-hover  border-2 hover:text-primary-blue duration-200 font-medium text-sm h-fit rounded-l-none  outline-none'
						}
					>
						Resultaten
					</button>
				</div>
			</section>
			<section className="grid grid-cols-3 pb-4">
				<div className="col-start-2 col-span-2 flex justify-between items-center">
					<h2 className="text-primary-blue text-title font-medium pb-3">
						Oefeningen van deze patiënt
					</h2>
					<Button text="+ oefening" action={navigateAddExcercise} />
				</div>
			</section>

			<section className="grid grid-cols-3 gap-6">
				<article className="shadow p-8 bg-white rounded-xl h-fit">
					<div className="flex justify-between items-center text-primary-blue">
						<h2 className="text-primary-blue text-title font-medium">
							Notities
						</h2>
						<svg
							onClick={editNotes}
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>
					</div>
					<p className="pb-2 text-sm border-b">
						Deze notities zijn alleen zichtbaar voor jouw
					</p>
					<form onSubmit={updateNotes}>
						<textarea
							readOnly={!noteIsEditing}
							className={`${
								noteIsEditing ? 'border p-3 mt-3' : 'pt-4'
							} w-full h-60`}
							name="patient_notes"
							id="patient_notes"
							value={noteVal}
							onChange={(e) => setNoteVal(e.target.value)}
						></textarea>
						{noteIsEditing && (
							<div className="flex justify-between items-center">
								<Button role="submit" text="Opslaan" type="primary" />
							</div>
						)}
					</form>
				</article>
				<article className="col-start-2 col-span-2">
					{activeTab === 'one' ? <PatientExercises /> : <PatientResults />}
				</article>
			</section>
		</main>

		/* <p>{patientInfo.age} jaar</p>
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
			))} */
	);
};

export default PatientDetail;
