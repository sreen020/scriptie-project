import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
		<div className="bg-primary-yellow">
			<h1>Login</h1>

			<form onSubmit={handleLogin}>
				<input className="border" type="text" name="username" />
				<input className="border" type="text" name="password" />
				<button type="submit">SUBMIT</button>
			</form>
			<p>{error}</p>
		</div>
	);
};

export default Expert;
