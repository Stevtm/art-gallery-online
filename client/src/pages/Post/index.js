import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ART } from "../../utils/mutations";

const Post = () => {
	// create state for holding form data
	const [formState, setFormState] = useState({
		title: "",
		category: "",
		price: "",
		description: "",
	});

	// mutation configuration
	const [addArt, { error }] = useMutation(ADD_ART);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form to add art
	const handleFormSubmit = async (event) => {
		// stop the page from reloading
		event.preventDefault();

		// check that all form elements have been populated, return if they haven't
		let formFilled = true;

		Object.values(formState).forEach((input) => {
			if (!input.length > 0) {
				formFilled = false;
			}
		});

		if (!formFilled) {
			alert("Please fill out all of the required fields.");
			return;
		}

		// add art in database
		try {
			const { data } = await addArt({
				variables: {
					addArtTitle: formState.title,
					addArtCategory: formState.category,
					addArtPrice: formState.price,
					addArtDescription: formState.description,
				},
			});

			window.location.assign("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h1>
				<b>Post New Art</b>
			</h1>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					name="title"
					id="title"
					type="text"
					value={formState.title}
					onChange={handleChange}
				></input>
				<p>What type of art is it?</p>
				<input
					name="category"
					id="photograph"
					value="photograph"
					type="radio"
					onChange={handleChange}
				></input>
				<label htmlFor="photograph">Photograph</label>
				<input
					name="category"
					id="drawing"
					value="drawing"
					type="radio"
					onChange={handleChange}
				></input>
				<label htmlFor="drawing">Drawing</label>
				<input
					name="category"
					id="painting"
					value="painting"
					type="radio"
					onChange={handleChange}
				></input>
				<label htmlFor="painting">Painting</label>
				<br></br>
				<label htmlFor="price">Price:</label>
				<input
					name="price"
					id="price"
					type="text"
					onChange={handleChange}
				></input>
				<br></br>
				<label htmlFor="description">Description:</label>
				<textarea
					name="description"
					id="description"
					onChange={handleChange}
				></textarea>
				<br></br>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Post;
