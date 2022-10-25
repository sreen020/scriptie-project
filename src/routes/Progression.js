import React, { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
	Chart,
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import BackButton from '../components/BackButton';
import { BodyComponent } from 'reactjs-human-body';
import '../styles/progression.css';

const Progression = () => {
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

	Chart.register(
		ArcElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const labels = [
		'Januari - Maart',
		'April - Juni',
		'Juli - September',
		'Oktober - December',
	];

	const lineChartData = {
		labels,
		datasets: [
			{
				label: '2021',
				data: [18, 30, 28, 25],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: '2022',
				data: [36, 25, 41, 11],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const DoughnutChartData = {
		labels: ['Blue', 'Yellow'],
		datasets: [
			{
				label: 'Progress chart',
				data: [30, 70],
				backgroundColor: ['#e2e2ff', '#130160'],
				borderColor: '#FCA34D',
			},
		],
	};

	const DoughnutOptions = {
		events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			title: {
				display: true,
			},
		},
	};

	return (
		<main className="p-4 sm:p-12 bg-primary-yellow">
			<BackButton />
			<section className="">
				<h1 className="text-4xl font-black pb-4 text-primary-blue">
					Hoe goed ben jij bezig?
				</h1>
				<p className="text-text-light max-w-lg pb-5">
					Lichamelijke activiteit kan leeftijdsgerelateerde beperkingen
					voorkomen of vertragen en zo ook het vermogen om zelfstandig te leven
					verlengen.
				</p>
				<p className="text-text-light max-w-lg">
					Bekijk hieronder een aantal statistieken over jouw activiteit. Zo te
					zien ben je goed bezig. Het aantal afgeronde oefeningen ligt hoger dan
					82% van de gebruikers.
				</p>
				<div className="flex items-center justify-center gap-10 py-16 flex-wrap">
					<article>
						<Doughnut
							data={DoughnutChartData}
							width={300}
							height={300}
							options={DoughnutOptions}
						/>
					</article>

					<div>
						<h2 className="text-2xl font-black text-primary-blue">
							Je zit op <span className="text-5xl">70%</span>
						</h2>
						<h2 className="text-2xl font-black text-primary-blue">
							van je weekelijkse doel
						</h2>
					</div>
				</div>
			</section>

			<section className="grid grid-cols-1 lg:grid-cols-3 py-20">
				<h2 className="text-right my-auto text-2xl font-black text-primary-blue">
					Aantal oefeningen gestart <br /> per maand
				</h2>
				<article className="max-w-screen-lg w-full col-span-2">
					<Line options={options} data={lineChartData} />
				</article>
			</section>

			<section className="grid grid-cols-1 lg:grid-cols-2 py-20">
				<article className="flex items-center justify-center flex-col">
					<div>
						<h2 className="text-left text-2xl font-black text-primary-blue">
							Jouw top 3 Favoriete oefening
						</h2>
						<p className="text-xl">
							<span className="text-3xl pr-2">1.</span> Bovenbenen strekken
						</p>
						<p className="text-xl">
							<span className="text-3xl pr-2">2.</span>Muur push-ups
						</p>
						<p className="text-xl">
							<span className="text-3xl pr-2">3.</span>De armen buigen
						</p>
					</div>
				</article>
				<article className="flex">
					<BodyComponent partsInput={bodyState} />
					<div className="my-auto">
						<h2 className="text-left text-2xl font-black">
							Jouw meest getrainde
						</h2>
						<h2 className="text-left text-2xl font-black">
							lichaamsdelen zijn:
						</h2>
						<h2 className="text-left text-4xl font-black text-primary-blue">
							Benen en Borst
						</h2>
					</div>
				</article>
			</section>
		</main>
	);
};

export default Progression;
