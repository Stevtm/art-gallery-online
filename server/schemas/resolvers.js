const { AuthenticationError } = require("apollo-server-express");
const { User, Art, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
<<<<<<< HEAD
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
=======
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v')
          .populate('art');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().select('-__v').populate('art');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v')
        .populate('art');
    },
    art: async (parent, { title, category, price, tag }) => {
      return Art.findOne({ title, category, price, tag })
        .select('-__v')
        .populate('comments, likes');
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
        throw new AuthenticationError('Incorrect credentials.');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
>>>>>>> b6672ed2940d70a0431d0fb562871af2246b1fe9
};

module.exports = resolvers;
