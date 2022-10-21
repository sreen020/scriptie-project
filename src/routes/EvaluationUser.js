import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	doc,
	getDoc,
	getFirestore,
	addDoc,
	collection,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';
import BackButton from '../components/BackButton';
import { BodyComponent } from 'reactjs-human-body';
import RangeSlider from 'react-range-slider-input';
import Button from '../components/Button';
import '../styles/EvaluationUser.css';

const EvaluationUser = () => {
	let navigate = useNavigate();
	const { exerciseId } = useParams();
	const db = getFirestore();
	const docRef = doc(db, 'exercises', exerciseId);
	const addRef = doc(db, 'patients', 'W4G8NUCGSerost6xfJlA');
	const [exerciseInfo, setExerciseInfo] = useState([]);
	const [selectedBodyParts, setSelectedBodyParts] = useState([]);
	const [translatedBodyParts, setTranslatedBodyParts] = useState([]);
	const [bodyState, setBodyState] = useState({
		head: {
			selected: false,
		},
		left_shoulder: {
			selected: false,
		},
		right_shoulder: {
			selected: false,
		},
		left_arm: {
			selected: false,
		},
		right_arm: {
			selected: false,
		},
		chest: {
			selected: false,
		},
		stomach: {
			selected: false,
		},
		left_leg: {
			selected: false,
		},
		right_leg: {
			selected: false,
		},
		left_hand: {
			selected: false,
		},
		right_hand: {
			selected: false,
		},
		left_foot: {
			selected: false,
		},
		right_foot: {
			selected: false,
		},
	});
	const [sliderOneValue, setSliderOneValue] = useState(0);
	const [sliderTwoValue, setSliderTwoValue] = useState(0);
	const [description, setDescription] = useState('');

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setExerciseInfo(doc.data());
		});
	}, []);

	const showBodyPart = (e) => {
		let bodyparts = [...selectedBodyParts];

		if (bodyparts.includes(e)) {
			bodyparts.splice(bodyparts.indexOf(e), 1);
		} else {
			bodyparts.push(e);
		}

		let translatedSelection = [];
		bodyparts.forEach((item) => {
			switch (item) {
				case 'head':
					translatedSelection.push('hoofd');
					break;
				case 'left_shoulder':
					translatedSelection.push('linker schouder');
					break;
				case 'right_shoulder':
					translatedSelection.push('rechter schouder');
					break;
				case 'left_arm':
					translatedSelection.push('linker arm');
					break;
				case 'right_arm':
					translatedSelection.push('rechter arm');
					break;
				case 'chest':
					translatedSelection.push('borst');
					break;
				case 'stomach':
					translatedSelection.push('buik');
					break;
				case 'left_leg':
					translatedSelection.push('linker been');
					break;
				case 'right_leg':
					translatedSelection.push('rechter been');
					break;
				case 'left_hand':
					translatedSelection.push('linker hand');
					break;
				case 'right_hand':
					translatedSelection.push('rechter hand');
					break;
				case 'left_foot':
					translatedSelection.push('linker voet');
					break;
				case 'right_foot':
					translatedSelection.push('rechter voet');
					break;
			}
		});

		setSelectedBodyParts(bodyparts);
		setTranslatedBodyParts(translatedSelection);
	};

	const handleForm = () => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = dd + '-' + mm + '-' + yyyy;

		const data = {
			date: today,
			name: exerciseInfo.name,
			difficulty: sliderOneValue,
			pain_indication: sliderTwoValue,
			body_parts: translatedBodyParts,
			body_parts_en: selectedBodyParts,
			description: description,
		};

		addDoc(collection(addRef, 'activity'), {
			data,
		}).then(
			navigate(`../recommended-exercises/${exerciseInfo.category}`, {
				replace: true,
			})
		);
	};

	return (
		<main className="p-4 sm:p-12">
			<section className="grid grid-cols-2 gap-8">
				<article className="">
					<h1 className="text-4xl font-black pb-4">
						{exerciseInfo.name} - Evaluatie
					</h1>
					<h2 className="font-bold text-primary-blue text-xl">
						Hoe heeft u deze oefening ervaren?
					</h2>
					<p className="text-text-light">
						Deze informatie wordt alleen gedeeld met uw deskundigen!
					</p>

					<div className="flex justify-center items-center shadow bg-white rounded-xl mt-5">
						<div className="flex flex-col items-center justify-center">
							<p className="font-medium pt-8 -mb-5">
								Klik op het lichaamsdeel waar u deze last heeft ervaren
							</p>
							<BodyComponent
								partsInput={bodyState}
								onClick={(e) => showBodyPart(e)}
							/>
						</div>
						<div className="-ml-8">
							{translatedBodyParts.length > 0 && (
								<p className="text-center font-bold -mt-8">
									U heeft geselecteerd:
								</p>
							)}
							{translatedBodyParts.map((part, index) => (
								<p
									className="text-center text-primary-blue capitalize"
									key={index}
								>
									{part}
								</p>
							))}
						</div>
					</div>
				</article>
				<article className="max-w-md flex flex-col gap-6 mx-auto justify-end">
					<div className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#130160"
							className="w-6 h-6 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
						<p className="text-text-light">
							Sleep het balletje horizontaal om een cijfer te geven
						</p>
					</div>

					<div className="pb-6">
						<p className="text-text-light pb-3">
							Moeilijkheidsgraad oefening:
							<span className="font-bold pl-2 text-lg">{sliderOneValue}</span>
						</p>
						<RangeSlider
							className="single-thumb"
							min="0"
							max="10"
							defaultValue={[0, 5]}
							thumbsDisabled={[true, false]}
							rangeSlideDisabled={true}
							onInput={(e) => setSliderOneValue(e[1])}
						/>
					</div>

					<div className="pb-6">
						<p className="text-text-light pb-3">
							Last aan geselecteerde lichaamsdeel:
							<span className="font-bold pl-2 text-lg">{sliderTwoValue}</span>
						</p>
						<RangeSlider
							className="single-thumb"
							min="0"
							max="10"
							defaultValue={[0, 5]}
							thumbsDisabled={[true, false]}
							rangeSlideDisabled={true}
							onInput={(e) => setSliderTwoValue(e[1])}
						/>
					</div>

					<article className="shadow p-8 bg-white rounded-xl h-fit hidden md:block">
						<div className="flex justify-between items-center text-primary-blue">
							<h2 className="text-primary-blue text-title font-medium">
								Beschrijving (optioneel)
							</h2>
						</div>
						<p className="pb-2 text-sm border-b">
							Deze notities zijn alleen zichtbaar voor jouw en uw deskundigen
						</p>
						<textarea
							className="border p-3 mt-3 w-full h-32"
							name="description"
							type="text"
							value={description}
							placeholder="Type hier uw beschrijving"
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</article>

					<div className="flex justify-end pt-5">
						<Button action={handleForm} text="Verstuur evaluatie" />
					</div>
				</article>
			</section>
		</main>
	);
};

export default EvaluationUser;
