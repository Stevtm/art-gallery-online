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
		img: String
		category: String
		description: String
		price: Int
		tag: [String]
		comments: [Comment]
		likeCount: Int
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

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		art: [Art]
		comments(username: String!): Comment
		likes: [Art]
	}

	type Mutation {
		login(email: String!): Auth
		addUser(username: String!, email: String!): Auth
		addArt(
			title: String!
			category: String!
			price: String!
			description: String!
		): Art
		addComment(artId: ID!, username: String!, commentText: String!): Art
		addLike(artId: ID!, username: String!): Art
	}
`;

module.exports = typeDefs;
