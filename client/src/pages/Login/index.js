import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./style.css";

const Login = () => {
	// set initial form state
	const [formState, setFormState] = useState({ email: "", password: "" });

	// mutation configuration
	const [login] = useMutation(LOGIN);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form to login user
	const handleFormSubmit = async (event) => {
		// stop the page from reloading
		event.preventDefault();

		// destructure user credentials from state
		const email = formState.email;
		const password = formState.password;

		// sign in user from database and assign token
		try {
			const { data } = await login({
				variables: {
					loginEmail: email,
					loginPassword: password,
				},
			});

			// assign token
			const token = data.login.token;
			Auth.login(token);
		} catch (err) {
			alert(err);
			console.log(err);
		}
	};

	return (
		<main
			className="flex-row justify-center mb-4"
			style={{ backgroundColor: "none" }}
		>
			<div className="col-12 col-md-6">
				<div className="card">
					<h4 className="card-header">Login</h4>
					<div className="card-body">
						<form onSubmit={handleFormSubmit}>
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
							<p>
								Don't have an account?
								<Link to="/signup" className="submit-button">
									{" "}
									Sign up
								</Link>
							</p>
							<span></span>
						</form>

						{/* {error && <div>Login failed</div>} */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
