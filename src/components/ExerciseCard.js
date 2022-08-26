import React, { useEffect } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ExerciseCard = ({ data, button, removeButton, action }) => {
	let navigate = useNavigate();
	console.log(data);
	return (
		<article
			className="flex flex-col px-6 py-5 rounded-xl bg-white shadow cursor-pointer"
			onClick={() => navigate(`../oefening/${data.id}`, { replace: true })}
		>
			<h2 className="text-primary-blue text-title font-medium pb-3">
				{data.name}
			</h2>
			<p className="font-light pb-3">{data.description}</p>

			<div className={`flex justify-between ${button && 'mb-3'}`}>
				<p className="text-primary-yellow font-bold">{data.category}</p>
				<p className="text-primary-yellow font-bold">{data.time_in_minutes}</p>
			</div>

			{button && (
				<Button type="primary" icon={false} text="Voeg toe +" action={action} />
			)}
			{removeButton && (
				<Button type="remove" icon={false} text="Verwijder" action={action} />
			)}
		</article>
	);
};

export default ExerciseCard;
