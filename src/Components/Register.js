import React from 'react'
import { Form, Message, Button, Image, Header } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

const Register = () => {
	const { register, handleSubmit, errors, formState } = useForm()

	const onSubmit = (data) => {
		console.log(data)
		if (formState.isSubmitted) {
			console.log('Redirect to success page')
		}
	}

	const validatePassword = (value) => {
		if (value.length < 6) {
			return 'Password should be at-least 6 characters.'
		} else if (
			!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*?_])/.test(value)
		) {
			return 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.'
		}
		return true
	}

	return (
		<div>
			<Header as="h1">Register</Header>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Image
					circular
					centered
					src="https://randomuser.me/api/portraits/men/41.jpg"
				></Image>

				{errors.firstname && (
					<Message negative>{errors.firstname.message}</Message>
				)}
				{errors.lastname && (
					<Message negative>{errors.lastname.message}</Message>
				)}
				{errors.email && (
					<Message negative>{errors.email.message}</Message>
				)}
				{errors.password && (
					<Message negative>{errors.password.message}</Message>
				)}

				<label>Name:</label>
				<Form.Group>
					<input
						type="text"
						name="firstname"
						placeholder="Firstname"
						ref={register({
							required: 'Firstname is required',
						})}
					/>

					<input
						type="text"
						name="lastname"
						placeholder="Lastname"
						ref={register({
							required: 'Lastname is required',
						})}
					/>
				</Form.Group>
				<Form.Group></Form.Group>
				<label>email & password</label>
				<Form.Group>
					<input
						type="text"
						name="email"
						placeholder="email"
						ref={register({
							required: 'Email is required',
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: 'Email is not valid',
							},
						})}
					/>

					<input
						type="password"
						name="password"
						placeholder="password"
						ref={register({
							required: 'Password is required',
							validate: validatePassword,
						})}
					/>
					<br></br>
				</Form.Group>
				<label>Gender / Sex:</label>
				<Form.Group>
					<input
						list="genders"
						name="gender"
						placeholder="Gender"
						ref={register({})}
					/>
					<datalist id="genders">
						<option value="Male"></option>
						<option value="Female"></option>
					</datalist>
					<input
						list="sexpreference"
						name="sexpreference"
						placeholder="Sexual preference"
						ref={register({})}
					/>
					<datalist id="sexpreference">
						<option value="Heterosexual"></option>
						<option value="Bi-sexual"></option>
						<option value="Gay"></option>
						<option value="Asexual"></option>
					</datalist>
				</Form.Group>
				<Button type="submit">Register</Button>
			</Form>
			<br></br>
		</div>
	)
}

export default Register