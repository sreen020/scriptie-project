import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ customRoute }) => {
	let navigate = useNavigate();

	return (
		<header className="pb-4">
			<div
				onClick={customRoute ? () => customRoute() : () => navigate(-1)}
				className="cursor-pointer flex items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				<p>Pagina terug</p>
			</div>
		</header>
	);
};

export default BackButton;
