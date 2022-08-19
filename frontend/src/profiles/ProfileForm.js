import React, { useState, useContext } from 'react';
import Alert from '../common/Alert';
import JoblyApi from '../api';
import UserContext from '../auth/UserContext';

//form to edit a user profile
//displays the profile form and handles changes to state; form submit posts to the API to save and triggers a reload.
//an Alert pops up to display a message on successful save

const ProfileForm = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		username: currentUser.username,
		password: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);

	//handle form submission
	async function handleSubmit(e) {
		e.preventDefault();
		let profileData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password
		};

		let username = formData.username;
		let updatedUser;

		try {
			updatedUser = await JoblyApi.saveProfile(username, profileData);
		} catch (err) {
			setFormErrors(err);
			return;
		}

		setFormData((f) => ({ ...f, password: '' }));
		setFormErrors([]);
		setSaveConfirmed(true);

		//trigger reload of user info
		setCurrentUser(updatedUser);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((f) => ({
			...f,
			[name]: value
		}));
		setFormErrors([]);
	};

	return (
		<div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<h2>Profile</h2>
					<div>
						<label>Username</label>
						<p className="username">{formData.username}</p>
						<label htmlFor="firstName">First Name</label>
						<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
						<label htmlFor="lastName">Last Name</label>
						<input type="text" name="LastName" value={formData.lastName} onChange={handleChange} />
						<label htmlFor="email">Email</label>
						<input type="text" name="email" value={formData.email} onChange={handleChange} />
						<label htmlFor="password">Confirm password to save changes:</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} />
					</div>
					{formErrors.length ? <Alert messages={formErrors} /> : null}

					{saveConfirmed ? <Alert messages={[ 'Updated successfully.' ]} /> : null}

					<button>Save Changes</button>
				</form>
			</div>
		</div>
	);
};

export default ProfileForm;
