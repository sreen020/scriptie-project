import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Expert = () => {
	const [error, setError] = useState('');
	let navigate = useNavigate();

	const userInfo = {
		username: 'user',
		password: 'password',
	};

	const ExpertInfo = {
		username: 'expert',
		password: 'password',
	};

	const handleLogin = (e) => {
		console.log(e);
		e.preventDefault();

		const usr = e.target.username.value;
		const pass = e.target.password.value;

		if (usr === userInfo.username && pass === userInfo.password) {
			console.log('logged in as user');
			navigate('/user', { replace: true });
		} else if (usr === ExpertInfo.username && pass === ExpertInfo.password) {
			navigate('/expert', { replace: true });
		} else {
			setError('Wrong login credentials');
			console.log('Wrong login credentials');
		}
	};

	return (
		<section className="grid grid-cols-2 min-h-screen">
			<article className="flex flex-col items-center justify-center">
				<div className="max-w-sm">
					<h1 className="text-center text-4xl font-black pb-4">Welkom terug</h1>
					<p className="text-center text-text-light">
						Log hieronder in om terug te gaan naar jouw favoriete bewegings
						oefeningen
					</p>

					<form onSubmit={handleLogin} className="grid gap-6 pt-10">
						<div>
							<label className="font-medium" htmlFor="username">
								Username
							</label>
							<input
								className="mt-2 text-formtext shadow-form bg-white border-0 rounded-md py-3 px-4 w-full text-xs"
								type="text"
								name="username"
								id="username"
							/>
						</div>
						<div>
							<label className="font-medium" htmlFor="password">
								Wachtwoord
							</label>
							<input
								className="mt-2 text-formtext shadow-form bg-white border-0 rounded-md py-3 px-4 w-full text-xs"
								type="password"
								name="password"
								id="password"
							/>
						</div>
						{/* <button type="submit">Log in</button> */}
						<div className="flex justify-end">
							<Button type="primary" text="Log in" icon={true} />
						</div>
					</form>
					<p>{error}</p>
				</div>
			</article>

			<article
				className="pt-20 rounded-l-3xl flex flex-col justify-center text-white items-center gap-16"
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
			</article>
		</section>
	);
};

export default Expert;
