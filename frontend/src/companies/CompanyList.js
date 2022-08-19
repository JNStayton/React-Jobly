import React, { useState, useEffect } from 'react';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './Company.css';

//show a list of companies in the DB

//loads the companies from the API on mount; reloads filtered companies when search form submitted

//route: /companies

const CompanyList = () => {
	const [ companies, setCompanies ] = useState(null);

	useEffect(function getCompaniesOnMount() {
		search();
	}, []);

	//this runs when search form is submitted
	async function search(name) {
		let companies = await JoblyApi.getCompanies(name);
		setCompanies(companies);
	}

	if (!companies) return <LoadingSpinner />;

	return (
		<div>
			<SearchForm searchFor={search} />
			{companies.length ? (
				<div className="company-list">
					{companies.map((company) => (
						<CompanyCard
							key={company.handle}
							handle={company.handle}
							name={company.name}
							description={company.description}
							logoUrl={company.logoUrl}
						/>
					))}
				</div>
			) : (
				<p>Sorry, no results for that search term</p>
			)}
		</div>
	);
};

export default CompanyList;
