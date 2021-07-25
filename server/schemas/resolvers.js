const { AuthenticationError } = require("apollo-server-express");
const { User, Art, Comment } = require("../models");
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
		addArt: async (parent, args) => {
			const art = await Art.create(args);

			return art;
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
