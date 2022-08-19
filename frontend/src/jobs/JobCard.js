import React, { useContext, useState } from 'react';
import UserContext from '../auth/UserContext';
import './Job.css';

//shows some information about a job.
//rendered by JobCardList; received 'apply' func prop from parent, which is called on apply

function JobCard({ id, title, salary, equity, companyName }) {
	console.debug('JobCard');

	const { hasAppliedToJob, applyToJob } = useContext(UserContext);
	const [ applied, setApplied ] = useState();

	React.useEffect(
		function updateAppliedStatus() {
			setApplied(hasAppliedToJob(id));
		},
		[ id, hasAppliedToJob ]
	);

	/** Apply for a job */
	async function handleApply(e) {
		if (hasAppliedToJob(id)) return;
		applyToJob(id);
		setApplied(true);
	}

	return (
		<div>
			{' '}
			{applied}
			<div className="job-card">
				<h6>
					Job Title: {title}{' '}
					<button id="apply-btn" onClick={handleApply} disabled={applied}>
						{applied ? 'Applied' : 'Apply'}
					</button>
				</h6>
				<p>{companyName}</p>
				<div>
					<small>Salary: {formatSalary(salary)}</small>
				</div>
				{equity !== undefined && (
					<div>
						<small>Equity: {equity}</small>
					</div>
				)}
			</div>
		</div>
	);
}

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
	if (!salary) {
		return 'Unpaid';
	}
	const digitsRev = [];
	const salaryStr = salary.toString();

	for (let i = salaryStr.length - 1; i >= 0; i--) {
		digitsRev.push(salaryStr[i]);
		if (i > 0 && i % 3 === 0) digitsRev.push(',');
	}

	return digitsRev.reverse().join('');
}

export default JobCard;
