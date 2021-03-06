import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./style.css";

const Signup = () => {
	// set initial form state
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: "",
	});

	// mutation configuration
	const [addUser] = useMutation(ADD_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form to create user
	const handleFormSubmit = async (event) => {
		// stop the page from reloading
		event.preventDefault();

		// destructure user credentials from state
		const username = formState.username;
		const password = formState.password;
		const email = formState.email;

		// create user in database
		try {
			const { data } = await addUser({
				variables: {
					addUserUsername: username,
					addUserEmail: email,
					addUserPassword: password,
				},
			});

			// assign token and login user
			const token = data.addUser.token;
			Auth.login(token);
		} catch (err) {
			alert("Err", err);
			console.error(err);
		}
	};

	return (
		<main className="flex-row justify-center mb-4">
			<div className="col-12 col-md-6">
				<div className="card">
					<h4 className="card-header">Sign Up</h4>
					<div className="card-body">
						<form onSubmit={handleFormSubmit}>
							<input
								className="form-input"
								placeholder="Your username"
								name="username"
								type="username"
								id="username"
								value={formState.username}
								onChange={handleChange}
							/>
							<input
								className="form-input"
								placeholder="Your email"
								name="email"
								type="email"
								id="email"
								value={formState.email}
								onChange={handleChange}
							/>
							<input
								className="form-input"
								placeholder="******"
								name="password"
								type="password"
								id="password"
								value={formState.password}
								onChange={handleChange}
							/>
							<button className="btn d-block w-100 submit-button" type="submit">
								Submit
							</button>
							{/* <Link to="/login">Login</Link> */}
						</form>
						{/* {error && <div>Sing up failed</div>} */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Signup;
