import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ExerciseCard = ({ data, button, removeButton, action }) => {
	let navigate = useNavigate();
	const [time, setTime] = useState(null);

	useEffect(() => {
		const minutes = Math.floor(data.time / 60);
		const seconds = data.time % 60;

		const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
		setTime(result);
	}, []);

	const padTo2Digits = (num) => {
		return num.toString().padStart(2, '0');
	};

	return (
		<article
			className="flex flex-col px-6 py-5 rounded-xl bg-white shadow cursor-pointer"
			onClick={() => navigate(`../oefening/${data.id}`, { replace: false })}
		>
			<h2 className="text-primary-blue text-title font-medium pb-3">
				{data.name}
			</h2>
			<p className="font-light pb-3">{data.description}</p>

			<div className={`flex justify-between mt-auto ${button && 'mb-3'}`}>
				<p className="text-primary-yellow font-bold">{data.category}</p>
				<p className="text-primary-yellow font-bold flex items-center gap-1 text-sm">
					<svg
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{time}
				</p>
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
