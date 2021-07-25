import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation AddUserMutation($addUserUsername: String!, $addUserEmail: String!) {
		addUser(username: $addUserUsername, email: $addUserEmail) {
			token
			user {
				_id
			}
		}
	}
`;

export const LOGIN = gql`
	mutation LoginMutation($loginEmail: String!) {
		login(email: $loginEmail) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_ART = gql`
	mutation AddArtMutation(
		$addArtTitle: String!
		$addArtCategory: String!
		$addArtPrice: Int!
		$addArtDescription: String!
	) {
		addArt(
			title: $addArtTitle
			category: $addArtCategory
			price: $addArtPrice
			description: $addArtDescription
		) {
			_id
			title
			img
			category
			description
			price
			tag
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation AddCommentMutation(
		$addCommentArtId: ID!
		$addCommentUsername: String!
		$addCommentCommentText: String!
	) {
		addComment(
			artId: $addCommentArtId
			username: $addCommentUsername
			commentText: $addCommentCommentText
		) {
			_id
			title
			img
			category
			description
			price
			tag
			comments {
				_id
				commentText
				createdAt
				username
			}
			likeCount
		}
	}
`;

export const ADD_LIKE = gql`
	mutation AddCommentMutation($addLikeArtId: ID!, $addLikeUsername: String!) {
		addLike(artId: $addLikeArtId, username: $addLikeUsername) {
			_id
			title
			img
			category
			description
			price
			tag
			comments {
				_id
				commentText
				createdAt
				username
			}
			likeCount
		}
	}
`;
