import React, { useState, useEffect } from 'react';
import Search from '../common/SearchForm';
import JoblyApi from '../api';
import JobCardList from './JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

//renders page with the list of jobs
//loads jobs from API, reloads filtered jobs with search term submitted

const JobList = () => {
	const [ jobs, setJobs ] = useState(null);

	useEffect(function getAllJobsOnMount() {
		search();
	}, []);

	//triggered by search form submit
	async function search(title) {
		let jobs = await JoblyApi.getJobs(title);
		setJobs(jobs);
	}

	if (!jobs) return <LoadingSpinner />;

	return (
		<div>
			<Search searchFor={search} />
			{jobs.length ? <JobCardList jobs={jobs} /> : <p>Sorry, no results for that search term</p>}
		</div>
	);
};

export default JobList;
