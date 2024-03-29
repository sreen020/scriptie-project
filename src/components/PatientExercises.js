import React from 'react';
import ExerciseCard from './ExerciseCard';

const PatientExercises = ({ data }) => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			{data.exercises &&
				data.exercises.map((item, index) => (
					<ExerciseCard data={item} key={index} />
				))}
		</section>
	);
};

export default PatientExercises;
