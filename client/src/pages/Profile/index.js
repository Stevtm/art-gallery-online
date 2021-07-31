import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import "./style.css";

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
      <div>
        <h1>
          <b>Your Profile</b>
        </h1>
        <h2>Username: {userData.username}</h2>
        <h2>Email: {userData.email}</h2>
        <>
          <h2>Your Art:</h2>
          {/* This should probably be broken out into it's own react component with the Art information passed in as props */}
          {userData.art.map((art) => {
            return (
              <div id="container">
                <div className="product-detail">
                  <h1 className="h1">{art.title}</h1>
                  <p className="p">{art.description}</p>
                  <div className="control">
                    <button className="btn">
                      <span className="price">${art.price}</span><span>  </span>
                      <span className="buy">Get now</span>
                    </button>
                  </div>
                </div>
				<div className="product-image">
					<img className="img" src={art.imgData} alt="uploaded art" width="300px"></img>
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
