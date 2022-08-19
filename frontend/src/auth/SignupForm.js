import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../common/Alert';
import './Form.css';

//Signup form
//Manages updates to state on change; on submit, calls signp and redirects to /companies

const SignupForm = ({ signup }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);

	//handle form submit
	async function handleSubmit(e) {
		e.preventDefault();
		let res = await signup(formData);
		if (res.success) {
			history.push('/companies');
		} else {
			setFormErrors(res.errors);
		}
	}

	//handle change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({ ...data, [name]: value }));
	};

	return (
		<div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<h2>Sign Up</h2>
					<div>
						<label htmlFor="username">Username</label>
						<input name="username" value={formData.username} onChange={handleChange} />
						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} />
						<label htmlFor="firstName">First name</label>
						<input name="firstName" value={formData.firstName} onChange={handleChange} />
						<label htmlFor="lastName">Last name</label>
						<input name="lastName" value={formData.lastName} onChange={handleChange} />
						<label>Email</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} />
					</div>
					<div>{formErrors.length ? <Alert messages={formErrors} /> : null}</div>
					<button>Sign Up</button>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
