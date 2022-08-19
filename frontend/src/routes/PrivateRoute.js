import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../auth/UserContext';

//Component for private routes.
//Component checks for valid current user and continues to routes if so. Otherwise, redirects to login.

const PrivateRoute = ({ exact, path, children }) => {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Redirect to="login" />;
	}

	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
};

export default PrivateRoute;
