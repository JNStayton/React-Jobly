import React from 'react';
import { Link } from 'react-router-dom';
import './Company.css';

//show basic information about a company; rendered on CompanyList

const CompanyCard = ({ name, description, logoUrl, handle }) => {
	return (
		<div className="company-card">
			<Link to={`/companies/${handle}`}>
				<div>
					<h4>{name}</h4>
					<p>{description}</p>
				</div>
			</Link>
		</div>
	);
};

export default CompanyCard;
