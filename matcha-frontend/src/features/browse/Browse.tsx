import React, { useState, useEffect, Fragment } from 'react';
import './browse.css';
import { Grid, Loader, Rail, Segment } from 'semantic-ui-react';
import { IPublicProfile } from '../../app/models/profile';
import agent from '../../app/api/agent';
import BrowseList from './BrowseList';
import BrowseListSorter from './BrowseListSorter';
import BrowseListFilter from './BrowseListFilter';

const Browse = () => {
	const [profiles, setProfiles] = useState<IPublicProfile[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		agent.Browse.list()
			.then((profileList) => {
				setProfiles(profileList);
			})
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Loader active />;

	return (
		<Grid centered>
			<Grid.Column width={10}>
				<Rail position="left">
					<BrowseListSorter profiles={profiles} setProfiles={setProfiles} />
					<BrowseListFilter />
				</Rail>
				<BrowseList profiles={profiles} />
			</Grid.Column>
		</Grid>
	);
};

export default Browse;
