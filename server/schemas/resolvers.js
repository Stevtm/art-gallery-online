const { AuthenticationError } = require("apollo-server-express");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();
const { User, Art, Comment, Image, Img } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v")
					.populate("art");

				return userData;
			}

			throw new AuthenticationError("Not logged in");
		},
		// users: async () => {
		// 	return User.find().select("-__v").populate("art");
		// },
		user: async (parent, { username }) => {
			return User.findOne({ username }).select("-__v").populate("art");
		},
		art: async () => {
			return Art.find().select("-__v").populate("comments").populate("likes");
		},
		// comments: async (parent, { username }) => {
		// 	const params = username ? { username } : {};
		// 	return Comment.find(params).sort({ createdAt: -1 });
		// },
		// image: async (parent, args) => {
		// 	console.log(args);
		// 	return Img.findOne({ imgData }).select("-__v");
		// },
		checkout: async (
			parent,
			{ title, description, imgData, price },
			context
		) => {
			const url = new URL(context.headers.referer).origin;

			const line_items = [];

			// generate product id
			const product = await stripe.products.create({
				name: title,
				description: description,
				images: [imgData],
			});

			// generate price id using the product id
			const stripePrice = await stripe.prices.create({
				product: product.id,
				unit_amount: price * 100,
				currency: "cad",
			});

			// add price id to the line items array
			line_items.push({
				price: stripePrice.id,
				quantity: 1,
			});

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items,
				mode: "payment",
				success_url: `${url}/success`,
				cancel_url: `${url}/`,
			});

			return { session: session.id };
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			// add user to firebase
			let signupSuccess = false;

			await admin
				.auth()
				.createUser({
					email: args.email,
					emailVerified: false,
					password: args.password,
					displayName: args.username,
					disabled: false,
				})
				.then((userRecord) => {
					signupSuccess = true;
					console.log("Successfully created a new user:", userRecord);
				})
				.catch((err) => {
					console.log("Error creating new user", err);
				});

			if (signupSuccess === false) {
				throw new AuthenticationError("Insufficient credentials.");
			}

			const user = await User.create({
				email: args.email,
				username: args.username,
			});
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			// check if the user credentials are ok with firebase
			let loginSuccess = false;

			await axios
				.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
					{
						email: email,
						password: password,
						returnSecureToken: true,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((loginData) => {
					loginSuccess = true;
					// console.log("loginSuccess 1", loginSuccess);
					console.log("User credentials verified");
				})
				.catch((err) => {
					console.log("User credentials could not be verified", err);
				});

			// console.log("loginSuccess 2", loginSuccess);

			if (loginSuccess === false) {
				throw new AuthenticationError("Incorrect credentials.");
			}

			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials.");
			}

			const token = signToken(user);
			return { token, user };
		},
		addArt: async (parent, args, context) => {
			console.log("args", args);

			const imgId = args.imgData;

			console.log("imgId", imgId);

			if (context.user) {
				// create document in art collection
				const art = await Art.create({
					...args,
					user: context.user.username,
				});

				// get the image document based on arg id
				// const image = await Img.findOne({ _id: imgId }).select("-__v");

				// console.log(image);

				// update art document to include image details
				// const updatedArt = await Art.findByIdAndUpdate(
				// 	{ _id: art._id },
				// 	{ $push: { img: image } },
				// 	{ new: true }
				// );

				// update user to include the art
				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { art: art._id } },
					{ new: true }
				);

				return art;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		// addComment: async (parent, { artId, commentText, username }) => {
		// 	const updatedArt = await Art.findOneAndUpdate(
		// 		{ _id: artId },
		// 		{
		// 			$push: { comments: { commentText: commentText, username: username } },
		// 		},
		// 		{ new: true }
		// 	);

		// 	return updatedArt;
		// },
		// addLike: async (parent, { artId, username }) => {
		// 	const updatedArt = await Art.findOneAndUpdate(
		// 		{ _id: artId },
		// 		{ $push: { likes: { username } } },
		// 		{ new: true }
		// 	);

		// 	return updatedArt;
		// },
	},
};

module.exports = resolvers;
