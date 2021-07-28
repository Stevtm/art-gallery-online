const { AuthenticationError } = require("apollo-server-express");
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
		users: async () => {
			return User.find().select("-__v").populate("art");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).select("-__v").populate("art");
		},
		art: async () => {
			return Art.find().select("-__v").populate("comments").populate("likes");
		},
		comments: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Comment.find(params).sort({ createdAt: -1 });
		},
		image: async (parent, args) => {
			console.log(args);
			return Img.findOne({ imgData }).select("-__v");
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email }) => {
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
					username: context.user.username,
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
		addComment: async (parent, { artId, commentText, username }) => {
			const updatedArt = await Art.findOneAndUpdate(
				{ _id: artId },
				{
					$push: { comments: { commentText: commentText, username: username } },
				},
				{ new: true }
			);

			return updatedArt;
		},
		addLike: async (parent, { artId, username }) => {
			const updatedArt = await Art.findOneAndUpdate(
				{ _id: artId },
				{ $push: { likes: { username } } },
				{ new: true }
			);

			return updatedArt;
		},
	},
};

module.exports = resolvers;
