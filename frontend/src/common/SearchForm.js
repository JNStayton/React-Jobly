import React, { useState } from 'react';
import '../auth/Form.css';

const SearchForm = ({ searchFor }) => {
	const [ searchTerm, setSearchTerm ] = useState('');

	//filter results if there is a search term
	const handleSubmit = (e) => {
		e.preventDefault();
		//prevent searching for blank spaces
		searchFor(searchTerm.trim() || undefined);
		setSearchTerm(searchTerm.trim());
	};

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<input
					name="searchTerm"
					placeholder="Enter search term..."
					value={searchTerm}
					onChange={handleChange}
				/>
				<button>Search</button>
			</form>
		</div>
	);
};

export default SearchForm;
