import React from 'react';
import Button from './Button';

const ExerciseCard = ({ name, desc, category, time, button }) => {
	return (
		<article className="flex flex-col px-6 py-5 rounded-xl bg-white shadow">
			<h2 className="text-primary-blue text-title font-medium pb-3">{name}</h2>
			<p className="font-light pb-3">{desc}</p>

			<div className={`flex justify-between ${button && 'mb-3'}`}>
				<p className="text-primary-yellow font-bold">{category}</p>
				<p className="text-primary-yellow font-bold">{time}</p>
			</div>

			{button && <Button type="primary" icon={false} text="Voeg toe +" />}
		</article>
	);
};

export default ExerciseCard;
