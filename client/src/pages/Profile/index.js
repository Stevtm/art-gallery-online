import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import ArtCard from "../../components/ArtCard";
import "./style.css";

const Profile = () => {
	// query for data of logged in user
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { userUsername: userParam },
	});

	const userData = data?.me || data?.user || {};

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<div>
				<h2 className="text-center">Profile Information:</h2>
				<h3>Username: {userData.username}</h3>
				<h3>Email: {userData.email}</h3>
				<h2 className="text-center">Art Postings:</h2>
				<div className="card-container">
					{/* This should probably be broken out into it's own react component with the Art information passed in as props */}
					{userData.art
						.slice(0)
						.reverse()
						.map((art) => {
							return <ArtCard art={art}></ArtCard>;
						})}
				</div>
			</div>
		</>
	);
};

export default Profile;
