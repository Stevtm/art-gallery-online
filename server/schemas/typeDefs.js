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
      description: String!
    ): Art
    addComment(artId: ID!, username: String!, commentText: String!): Art
    addLike(username: String!): Art
  }
`;

module.exports = typeDefs;
