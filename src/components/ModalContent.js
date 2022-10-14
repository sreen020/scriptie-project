import React, { useState } from 'react';
import { BodyComponent } from 'reactjs-human-body';
import RangeSlider from 'react-range-slider-input';
import '../styles/EvaluationUser.css';

const ModalContent = ({ handleClose, data }) => {
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
			selected: true,
		},
		stomach: {
			selected: false,
		},
		left_leg: {
			selected: true,
		},
		right_leg: {
			selected: true,
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

	console.log(data);

	return (
		<section>
			<article className="flex justify-between items-center">
				<div>
					<h2 className="text-4xl font-black">{data.name}</h2>
					<p className="text-xl text-primary-yellow font-medium pb-4">
						{data.date}
					</p>
				</div>

				<svg
					onClick={handleClose}
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</article>

			<section className="grid grid-cols-2 gap-8">
				<article>
					<BodyComponent partsInput={bodyState} />
				</article>

				<article className="flex flex-col justify-center gap-10">
					<div>
						<p className="text-text-light pb-3 font-bold">
							Moeilijkheidsgraad oefening: {data.difficulty}
						</p>
						<RangeSlider
							className="single-thumb"
							min="0"
							max="10"
							defaultValue={[0, data.difficulty]}
							thumbsDisabled={[true, true]}
							rangeSlideDisabled={true}
						/>
					</div>

					<div>
						<p className="text-text-light pb-3 font-bold">
							Last aan geselecteerde lichaamsdeel: {data.pain_indication}
						</p>
						<RangeSlider
							className="single-thumb"
							min="0"
							max="10"
							defaultValue={[0, data.pain_indication]}
							thumbsDisabled={[true, true]}
							rangeSlideDisabled={true}
						/>
					</div>

					{data.description ? (
						<div>
							<p className="text-text-light pb-3 font-bold">Beschrijving</p>
							<p>{data.description}</p>
						</div>
					) : null}
				</article>
			</section>
		</section>
	);
};

export default ModalContent;
