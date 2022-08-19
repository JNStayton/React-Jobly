import React from 'react';

//component for alerts, particularly error messages during form submission

const Alert = ({ messages = [] }) => {
	return <div>{messages.map((error) => <p key={error}>{error}</p>)}</div>;
};

export default Alert;
