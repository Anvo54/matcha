import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import MultiSelectInput from '../../app/common/form/MultiSelectInput';
import RangeInput from '../../app/common/form/RangeInput';
import { IInterestOption } from '../../app/models/interest';

interface IProps {
	interests: IInterestOption[];
	loadProfiles: (
		params: any
	) => Promise<
		| {
				'FINAL_FORM/form-error': any;
		  }
		| undefined
	>;
}

const ResearchForm: React.FC<IProps> = ({ interests, loadProfiles }) => {
	const initialValues = {
		age: [0, 100],
		fameRating: [0, 10],
		distance: [0, 1000],
		interests: [],
	};

	return (
		<FinalForm
			onSubmit={loadProfiles}
			initialValues={initialValues}
			render={({
				handleSubmit,
				submitting,
				submitError,
				dirtySinceLastSubmit,
				form,
			}) => (
				<Form onSubmit={handleSubmit} error>
					<Header as="h2" content="Research" />
					<Field
						label="Age"
						name="age"
						min={0}
						max={100}
						component={RangeInput}
					/>
					<Field
						label="Fame Rating"
						name="fameRating"
						min={0}
						max={10}
						component={RangeInput}
					/>
					<Field
						label="Distance"
						name="distance"
						min={0}
						max={1000}
						component={RangeInput}
					/>
					<Field
						component={MultiSelectInput}
						placeholder="Interests"
						allowAdditions={false}
						name="interests"
						options={interests}
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage message={submitError} />
					)}
					<Button
						color="pink"
						basic
						type="button"
						onClick={form.reset}
						content="Reset"
						disabled={submitting}
					/>
					<Button
						color="pink"
						type="submit"
						floated="right"
						loading={submitting}
						content="Search"
						disabled={submitting}
					/>
				</Form>
			)}
		/>
	);
};

export default ResearchForm;