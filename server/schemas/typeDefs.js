const { gql } = require("apollo-server-express");

const typeDefs = gql`
<<<<<<< HEAD
	type User {
		_id: ID
		username: String
		email: String
		art: [Art]
		# comments: [Comment]
	}

	type Art {
		_id: ID
		title: String
		# description: String
		img: String
		category: String
		price: Int
		tag: String
		# likes: [Like]
		comments: [Comment]
		# user: [user]
	}

	type Comment {
		_id: ID
		commentText: String
		createdAt: String
		username: String
	}

	type Like {
		_id: ID
		username: String
		like: Int
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		art(title: String, category: String, price: Int, tag: String): Art
		# when would we use these comments and likes queries?
		comments(username: String!): Comment
		likes: [Art]
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		# some categories missing, but I'm assuming it's just for testing?
		addArt(
			username: String!
			title: String!
			category: String!
			price: Int!
		): User
		addComment(username: String!, commentText: String!): Art
		addLike(username: String!): Art
	}
=======
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
    price: Int
    tag: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }

  type Like {
    _id: ID
    username: String
    like: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    art(title: String, category: String, price: Int, tag: String): Art
    comments(username: String!): Comment
    likes: [Art]
  }

  type Mutation {
    login(email: String!): Auth
    addUser(username: String!, email: String!): Auth
    addArt(
      username: String!
      title: String!
      category: String!
      price: Int!
    ): User
    addComment(username: String!, commentText: String!): Art
    addLike(username: String!): Art
  }
>>>>>>> b6672ed2940d70a0431d0fb562871af2246b1fe9
`;

module.exports = typeDefs;
