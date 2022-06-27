import React from 'react';

const PatientCard = ({ name, birthDate }) => {
	return (
		<article className="flex items-center justify-between px-6 py-5 rounded-xl bg-white shadow">
			<div>
				<h2 className="text-primary-blue text-title font-medium pb-3">
					{name}
				</h2>
				<p className="text-primary-yellow">{birthDate}</p>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</article>
	);
};

export default PatientCard;
