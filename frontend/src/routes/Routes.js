import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import CompanyDetail from '../companies/CompanyDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from './PrivateRoute';

//Routes for the app
//Private routes are only visible to logged-in users (PrivateRoute is an authorization component)
//Non-existant routes redirect to Home

const Routes = ({ login, signup }) => {
	return (
		<div>
			<Switch>
				{/* Homepage */}
				<Route exact path="/">
					<Home />
				</Route>
				{/* Login Page */}
				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>
				{/* Signup Form */}
				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>
				{/* Private Routes accessible only to logged-in users */}
				{/* Companies Page */}
				<PrivateRoute exact path="/companies">
					<CompanyList />
				</PrivateRoute>
				{/* Company Detail Page */}
				<PrivateRoute exact path="/companies/:handle">
					<CompanyDetail />
				</PrivateRoute>
				{/* Jobs Page */}
				<PrivateRoute exact path="/jobs">
					<JobList />
				</PrivateRoute>
				{/* User Profile Page */}
				<PrivateRoute exact path="/profile">
					<ProfileForm />
				</PrivateRoute>
				{/* All other routes redirect to Home */}
				<Redirect to="/" />
			</Switch>
		</div>
	);
};

export default Routes;
