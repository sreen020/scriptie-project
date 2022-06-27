import React from 'react';
import Button from '../components/Button';
import PatientCard from '../components/PatientCard';
import ExerciseCard from '../components/ExerciseCard';

const User = () => {
	return (
		<div>
			<h1>User</h1>
			<Button type="primary" text="Submit form" />
			<Button type="secondary" icon={true} text="test" />
			<PatientCard name="Barend Megens" birthDate="07-05-1956" />
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
			/>
		</div>
	);
};

export default User;
