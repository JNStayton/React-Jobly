import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import Alert from '../common/Alert';

//form for logging in
//updates state on change; when submitted, calls the login function and redirects to /companies

const LoginForm = ({ login }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: '',
		password: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);

	//form submit
	async function handleSubmit(e) {
		e.preventDefault();
		let res = await login(formData);
		if (res.success) {
			history.push('./companies');
		} else {
			setFormErrors(res.errors);
		}
	}

	//handling form changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((l) => ({ ...l, [name]: value }));
	};

	return (
		<div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<h2 className="title">Log In</h2>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Username"
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="current-password"
						required
					/>
					{formErrors.length ? <Alert messages={formErrors} /> : null}
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
