import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import User from './routes/User';
import Expert from './routes/Expert';
import Login from './routes/Login';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="/" element={<App />} />
			<Route path="user" element={<User />} />
			<Route path="expert" element={<Expert />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
