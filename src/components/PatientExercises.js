import React from 'react';
import ExerciseCard from './ExerciseCard';

const PatientExercises = () => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			<ExerciseCard
				name="Abdominal Crunches"
				desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
				category="legs"
				time="01:30"
				button={true}
			/>

			<ExerciseCard
				name="Abdominal Crunches"
				desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
				category="legs"
				time="01:30"
				button={true}
			/>

			<ExerciseCard
				name="Abdominal Crunches"
				desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
				category="legs"
				time="01:30"
				button={true}
			/>

			<ExerciseCard
				name="Abdominal Crunches"
				desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
				category="legs"
				time="01:30"
				button={true}
			/>

			<ExerciseCard
				name="Abdominal Crunches"
				desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
				category="legs"
				time="01:30"
				button={true}
			/>
		</section>
	);
};

export default PatientExercises;
