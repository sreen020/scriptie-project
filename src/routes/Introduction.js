import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import IntroductionPageOne from '../components/IntroductionPageOne';
import IntroductionPageTwo from '../components/IntroductionPageTwo';
import IntroductionPageThree from '../components/IntroductionPageThree';

const Introduction = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState('');
	let navigate = useNavigate();

	const handleNavigation = (num) => {
		setCurrentPage(num);
	};

	return (
		<main className="grid md:grid-cols-2">
			<section className="flex flex-col items-center justify-center px-8">
				<div className="max-w-sm">
					<h1 className="text-6xl text-center pb-12 md:hidden text-primary-blue">
						SO-NUTS
					</h1>
					{currentPage === 1 && (
						<IntroductionPageOne buttonAction={() => handleNavigation(2)} />
					)}
					{currentPage === 2 && (
						<IntroductionPageTwo buttonAction={() => handleNavigation(3)} />
					)}
					{currentPage === 3 && (
						<IntroductionPageThree buttonAction={() => handleNavigation(1)} />
					)}
				</div>

				<div className="pt-20 flex gap-6">
					<span
						className={`block w-4 h-4  border-2 border-primary-blue rounded-full ${
							currentPage === 1 ? 'bg-primary-blue' : 'bg-primary-violet-hover'
						}`}
					></span>
					<span
						className={`block w-4 h-4  border-2 border-primary-blue rounded-full ${
							currentPage === 2 ? 'bg-primary-blue' : 'bg-primary-violet-hover'
						}`}
					></span>
					<span
						className={`block w-4 h-4  border-2 border-primary-blue rounded-full ${
							currentPage === 3 ? 'bg-primary-blue' : 'bg-primary-violet-hover'
						}`}
					></span>
				</div>
			</section>

			<section
				className="pt-20 rounded-l-3xl md:flex flex-col justify-center text-white items-center gap-16 pl-8 hidden"
				style={{
					background:
						'linear-gradient(270deg, rgba(66, 51, 127, 0.9) 8.85%, #130160 100%)',
				}}
			>
				<div className="max-w-md">
					<h1 className="text-6xl">SO-NUTS</h1>
					<p>
						Verbeter jouw fysieke activiteit door bewegingsoefeningen op maat!
					</p>
				</div>

				<img
					className="ml-auto w-9/12"
					src="/img/screenshot.png"
					alt="Screenshot of application"
				/>
			</section>
		</main>
	);
};

export default Introduction;
