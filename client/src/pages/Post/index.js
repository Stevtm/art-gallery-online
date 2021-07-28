import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ART } from "../../utils/mutations";
import firebase from "firebase";
// import axios from "axios";
// import multer from "multer";

const Post = () => {
	// create state for holding form data
	const [formState, setFormState] = useState({
		title: "",
		category: "",
		price: "",
		description: "",
		// imgName: "",
		imgData: "",
	});

	// mutation configuration
	const [addArt, { error }] = useMutation(ADD_ART);

	// update state based on form input changes

	// const [multerImage, setMulterImage] = useState("");

	// const generateImageName = function () {
	// 	return "multer-image-" + Date.now();
	// };

	// const uploadImage = (e, method) => {
	// 	const test = generateImageName();
	// 	let imageObj = {};
	// 	console.log(test);
	// 	let imageFormObj = new FormData();

	// 	imageFormObj.append("imgName", test);
	// 	imageFormObj.append("imgData", e.target.files[0]);

	// 	// setFormState({
	// 	// 	...formState,
	// 	// 	imgName: test,
	// 	// 	// imgData: e.target.files[0],
	// 	// });
	// 	setMulterImage({
	// 		multerImage: URL.createObjectURL(e.target.files[0]),
	// 	});

	// 	axios
	// 		.post(`/image/uploadmulter`, imageFormObj, {
	// 			headers: {
	// 				"Access-Control-Allow-Origin": "*",
	// 			},
	// 		})
	// 		.then((data) => {
	// 			console.log("data", data.data.new_img._id);
	// 			setFormState({
	// 				...formState,
	// 				imgData: data.data.new_img._id,
	// 			});
	// 			// if (data.data.success) {
	// 			// 	alert("Image has been successfully uploaded using multer");
	// 			// }
	// 		})
	// 		.catch((err) => {
	// 			alert("Error while uploading image");
	// 		});
	// };

	// declare variables for firebase upload
	const uploadImage = async (event) => {
		var storage = firebase.storage();

		const files = event.target.files;

		const imgName = "img-" + Date.now();

		await storage
			.ref("Images/" + imgName + ".png")
			.put(files[0])
			.on("state_changed", alert("success"), alert, () => {
				storage
					.ref("Images/")
					.child(imgName + ".png")
					.getDownloadURL()
					.then((url) => {
						setFormState({
							...formState,
							imgData: url,
						});
					});
			});

		// uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
		// 	setFormState({
		// 		...formState,
		// 		imgData: url,
		// 	});
		// });
	};

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
					// addArtImgName: formState.imgName,
					addArtImgData: formState.imgData,
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
				<div>
					<h4>Upload</h4>
					<p>Test of an upload to our server.</p>

					<input id="img" type="file" onChange={(e) => uploadImage(e)} />
				</div>
				<br></br>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Post;
