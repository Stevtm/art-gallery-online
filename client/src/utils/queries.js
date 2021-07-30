import { gql } from "@apollo/client";

export const QUERY_ME = gql`
	query Query {
		me {
			_id
			username
			email
			art {
				_id
				title
				description
				category
				price
				imgData
			}
		}
	}
`;

// Don't think we ever use this query - can can possibly remove.
export const QUERY_USERS = gql`
	query Query {
		users {
			_id
			username
		}
	}
`;

export const QUERY_USER = gql`
	query Query($userUsername: String!) {
		user(username: $userUsername) {
			_id
			username
			email
			art {
				_id
				title
				img
				category
				description
				price
				tag
				likeCount
			}
		}
	}
`;

export const QUERY_ART = gql`
	query Query {
		art {
			_id
			title
			category
			description
			price
			imgData
			createdAt
		}
	}
`;

export const QUERY_COMMENTS = gql`
	query Query($commentsUsername: String!) {
		comments(username: $commentsUsername) {
			_id
			commentText
			createdAt
		}
	}
`;

export const QUERY_IMAGE = gql`
	query Query($imageImgName: String) {
		image(imgName: $imageImgName) {
			imgName
			imgData
		}
	}
`;
