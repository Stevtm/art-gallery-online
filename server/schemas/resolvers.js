const { AuthenticationError } = require("apollo-server-express");
const { User, Art, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					// no more pw in the db
					.select("-__v, -password")
					.populate("art");

				return userData;
			}

			throw new AuthenticationError("Not logged in");
		},
		users: async () => {
			// no more pw in the db
			return User.find().select("-__v, -password").populate("art");
		},
		user: async ({ username }) => {
			return (
				User.findOne({ username })
					// no more pw in the db
					.select("-__v -password")
					.populate("art")
			);
		},
		art: async ({ title, category, price, tag }) => {
			return Art.findOne({ title, category, price, tag })
				.select("-__v")
				.populate("comments, likes");
		},
		comments: async ({ username }) => {
			const params = username ? { username } : {};
			return Comment.find(params).sort({ createdAt: -1 });
		},
	},

	Mutation: {
		addUser: async (args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async ({ email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials.");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials.");
			}

			const token = signToken(user);
			return { token, user };
		},
	},
};

module.exports = resolvers;
