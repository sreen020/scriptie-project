import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Introduction from './routes/Introduction';
import PatientList from './routes/PatientList';
import PatientDetail from './routes/PatientDetail';
import UserOverview from './routes/UserOverview';
import PatientAddExercise from './routes/PatientAddExercise';
import ExerciseDetailPage from './routes/ExerciseDetailPage';
import StartExercise from './routes/StartExercise';
import EndExercise from './routes/EndExercise';
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
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="overview" element={<UserOverview />} />
			<Route path="introduction" element={<Introduction />} />
			<Route path="patient-list" element={<PatientList />} />
			<Route path="/patients/:patientId" element={<PatientDetail />} />
			<Route
				path="/patients/:patientId/nieuwe-oefening"
				element={<PatientAddExercise />}
			/>
			<Route path="/oefening/:exerciseId" element={<ExerciseDetailPage />} />
			<Route path="/start/:exerciseId" element={<StartExercise />} />
			<Route path="/eind/:exerciseId" element={<EndExercise />} />
			{/* <Route path="/evaluatie/:exerciseId" element={<EvaluationUser />} /> */}
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
