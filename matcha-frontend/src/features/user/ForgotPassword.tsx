import { ErrorMessage } from '@hookform/error-message';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { BackendError } from '../../app/models/errors';
import { IForgetPassword } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import TextInput from './TextInput';

const ForgotPassword = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		forgetOpen,
		closeForget,
		successOpen,
		openSuccess,
		closeSuccess,
	} = rootStore.modalStore;
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit, errors, setError } = useForm();

	const onSubmit = (data: IForgetPassword) => {
		setLoading(true);
		agent.User.forget(data)
			.catch((error: BackendError) => {
				setError('global', { type: 'manual', message: error.message });
			})
			.finally(() => {
				setLoading(false);
				openSuccess();
				closeForget();
			});
	};

	return (
		<>
			<Modal open={forgetOpen} onClose={closeForget}>
				<Modal.Header>Forget your password?</Modal.Header>
				<Modal.Content>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<TextInput
							type="text"
							name="emailAddress"
							label="Email address"
							errors={errors}
							register={register({
								required: 'Email address is required',
								pattern: {
									value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
									message: 'Email is not valid',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="global"
							render={({ message }) => <Message negative>{message}</Message>}
						/>
						<Button
							primary
							type="submit"
							loading={loading}
							content="Reset password"
						/>
					</Form>
				</Modal.Content>
			</Modal>
			<Modal open={successOpen} onClose={closeSuccess}>
				<Modal.Header>Password request sended</Modal.Header>
				<Modal.Content>Please check your email!</Modal.Content>
				<Modal.Actions>
					<Button
						content="Go Back"
						labelPosition="right"
						icon="checkmark"
						onClick={closeSuccess}
						positive
					/>
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default observer(ForgotPassword);