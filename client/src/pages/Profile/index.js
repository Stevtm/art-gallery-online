import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./style.css";

const Profile = () => {
	// query for data of logged in user
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { userUsername: userParam },
	});

	const userData = data?.me || data?.user || {};

	// if the user is logged in, redirect to the personal profile
	if (Auth.loggedIn && Auth.getProfile().data.username === userParam) {
		return <Redirect to="/profile"></Redirect>;
	}

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
			<div>
				<img
					className="img-thumbnail mx-1"
					src={userData.username}
					alt="profile"
				></img>
				<h1>{/* <b>Your Profile</b> */}</h1>
				<h2>Username: {userData.username}</h2>
				<h2>Email: {userData.email}</h2>
				<>
					<h2>My Art collections:</h2>
					{/* This should probably be broken out into it's own react component with the Art information passed in as props */}
					{userData.art.map((art) => {
						return (
							<div id="container">
								<div className="product-detail">
									<h1 className="h1">{art.title}</h1>
									<p className="p">{art.description}</p>
									<div className="control">
										<button className="btn">
											<span className="price">${art.price}</span>
											<span> </span>
											<span className="buy">Buy now</span>
										</button>
									</div>
								</div>
								<div className="product-image">
									<img
										className="img"
										src={art.imgData}
										alt="uploaded art"
										width="300px"
									></img>
								</div>
							</div>
						);
					})}
				</>

				<h2>Your Comments:</h2>
			</div>
		</>
	);
};

export default Profile;
