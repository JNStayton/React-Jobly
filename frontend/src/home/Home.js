import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Home.css';

const Home = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div className="home">
			<h1>Jobly</h1>
			<p>Search and Apply For Jobs</p>
			{currentUser ? (
				<h2>Welcome back, {currentUser.username}.</h2>
			) : (
				<p>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
				</p>
			)}
		</div>
	);
};

export default Home;
