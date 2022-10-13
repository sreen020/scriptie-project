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
				<h2 className="text-4xl font-black pb-4">{data.name}</h2>
				<p onClick={handleClose}>close Button</p>
			</article>

			<BodyComponent partsInput={bodyState} />
			<RangeSlider
				className="single-thumb"
				min="0"
				max="10"
				defaultValue={[0, 5]}
				thumbsDisabled={[true, false]}
				rangeSlideDisabled={true}
			/>
		</section>
	);
};

export default ModalContent;
