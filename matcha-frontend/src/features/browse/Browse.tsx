import React from 'react';
import { Link } from 'react-router-dom';
import './browse.style.css';
import {
	Container,
	Card,
	Image,
	Header,
	Dropdown,
	Divider,
	Grid,
} from 'semantic-ui-react';
import { IUser } from '../../app/models/user';

interface IProps {
	users: IUser[];
}

const interests = [
	{ key: 'angular', text: 'Angular', value: 'angular' },
	{ key: 'css', text: 'CSS', value: 'css' },
	{ key: 'design', text: 'Graphic Design', value: 'design' },
	{ key: 'ember', text: 'Ember', value: 'ember' },
	{ key: 'html', text: 'HTML', value: 'html' },
	{ key: 'ia', text: 'Information Architecture', value: 'ia' },
	{ key: 'javascript', text: 'Javascript', value: 'javascript' },
	{ key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
	{ key: 'meteor', text: 'Meteor', value: 'meteor' },
	{ key: 'node', text: 'NodeJS', value: 'node' },
	{ key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
	{ key: 'python', text: 'Python', value: 'python' },
	{ key: 'rails', text: 'Rails', value: 'rails' },
	{ key: 'react', text: 'React', value: 'react' },
	{ key: 'repair', text: 'Kitchen Repair', value: 'repair' },
	{ key: 'ruby', text: 'Ruby', value: 'ruby' },
	{ key: 'ui', text: 'UI Design', value: 'ui' },
	{ key: 'ux', text: 'User Experience', value: 'ux' },
];

const Browse: React.FC<IProps> = ({ users }) => {
	return (
		<Container>
			<Grid columns={2} relaxed="very" stackable>
				<Grid.Column>
					<Header as="h3">Sort</Header>
					<Dropdown
						placeholder="Sort"
						scrolling
						text="Sort"
						icon="filter"
						labeled
						button
						className="icon"
						options={[
							{ key: 'age', value: 'age', text: 'Age' },
							{
								key: 'location',
								value: 'location',
								text: 'Location',
							},
							{
								key: 'fame_rating',
								value: 'fame_rating',
								text: 'Fame rating',
							},
						]}
					/>
				</Grid.Column>
				<Grid.Column textAlign="right">
					<Header as="h3">Filter by tag</Header>
					<Dropdown
						multiple
						search
						name="selectInterest"
						selection
						options={interests}
						/* value={inters.selectedIterest} */
						allowAdditions
						additionLabel={
							<i style={{ color: 'red' }}>New interest: </i>
						}
						/* 						onAddItem={handleAddition}
										onChange={handleMultiChange} */
					></Dropdown>
				</Grid.Column>
			</Grid>

			<Divider />
			<Card.Group itemsPerRow={3}>
				{users.map((user) => (
					<Card
						key={user.location.latitude - Date.now()}
						as={Link}
						to={'/profile'}
					>
						<Image
							src={`https://robohash.org/${user.firstName}`}
							wrapped
							ui={false}
						/>
						<Header as="h5">
							{user.firstName} {user.lastName}
						</Header>
						<Card.Content>
							Distance: {Math.floor(Math.random() * 80)} km
							<Card.Meta>
								Likes:{' '}
								{Math.abs(Math.floor(user.location.latitude))}
							</Card.Meta>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		</Container>
	);
};

export default Browse;