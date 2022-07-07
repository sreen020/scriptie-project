import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
	return (
		<nav
			style={{
				borderBottom: 'solid 1px',
				paddingBottom: '1rem',
			}}
		>
			<Link to="/user">Users</Link>
			<Link to="/patient-list">Expert</Link>
		</nav>
	);
};

export default App;
