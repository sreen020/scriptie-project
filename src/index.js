import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import User from './routes/User';
import PatientList from './routes/PatientList';
import PatientDetail from './routes/PatientDetail';
import PatientAddExercise from './routes/PatientAddExercise';
import Login from './routes/Login';
import App from './App';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDKPSYxwFW5zOUA5ZU-c1fVyr94vYPrSi0',
	authDomain: 'movemore-57a9a.firebaseapp.com',
	projectId: 'movemore-57a9a',
	storageBucket: 'movemore-57a9a.appspot.com',
	messagingSenderId: '777537264807',
	appId: '1:777537264807:web:38a953c15bbb2323524f82',
};

initializeApp(firebaseConfig);

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="/" element={<App />} />
			<Route path="user" element={<User />} />
			<Route path="patient-list" element={<PatientList />} />
			<Route path="/patients/:patientId" element={<PatientDetail />} />
			<Route
				path="/patients/:patientId/nieuwe-oefening"
				element={<PatientAddExercise />}
			/>
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
