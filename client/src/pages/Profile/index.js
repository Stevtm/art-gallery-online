import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const Profile = () => {
	// query for data of logged in user
	const { loading, data } = useQuery(QUERY_ME);

	const userData = data?.me || {};

	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (!userData.username) {
		return (
			<h2>
				You must be logged in to see this page. Use the navigation links above
				to sign up or log in.
			</h2>
		);
	}

	return (
		<>
			<h1>
				<b>Your Profile</b>
			</h1>
			<h2>Username: {userData.username}</h2>
			<h2>Email: {userData.email}</h2>
			<h2>Your Art:</h2>
			<h2>Your Comments:</h2>
		</>
	);
};

export default Profile;
