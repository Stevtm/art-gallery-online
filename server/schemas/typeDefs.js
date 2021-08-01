const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		art: [Art]
	}

	type Art {
		_id: ID
		title: String
		imgData: String
		category: String
		description: String
		price: Int
		tag: [String]
		comments: [Comment]
		likeCount: Int
		createdAt: String
		user: String
	}

	type Comment {
		_id: ID
		commentText: String
		createdAt: String
		username: String
	}

	type Like {
		username: String!
	}

	type Image {
		imgName: String!
		imgData: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Checkout {
		session: ID
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		art: [Art]
		# comments(username: String!): Comment
		# likes: [Art]
		# image(imgName: String): Image
		checkout(product: [ID]!): Checkout
	}

	type Mutation {
		login(email: String!): Auth
		addUser(username: String!, email: String!): Auth
		addArt(
			title: String!
			category: String!
			price: String!
			description: String!
			imgData: String
			user: String
		): Art
		# addComment(artId: ID!, username: String!, commentText: String!): Art
		# addLike(artId: ID!, username: String!): Art
	}
`;

module.exports = typeDefs;
