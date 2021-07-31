import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ART } from "../../utils/queries";
import axios from "axios";
import "./style.css";

const ArtGallery = () => {
	// query for art data
	const { loading, data } = useQuery(QUERY_ART);
	// const imgData = useQuery(QUERY_IMAGE);

	// console.log(imgData);

	const artData = data?.art || [];

	if (loading) {
		return <h2>Loading...</h2>;
	}

	console.log(artData);

	return (
		<>
			<b>Gallery</b>
			{artData.map((art) => {
				// This should probably be broken out into its own react component
				return (
					<div key={art._id} className="temp">
						<img src={art.imgData} alt="uploaded art" width="300px"></img>
						<h3>{art.title}</h3>
						<h3>{art.description}</h3>
						<h3>${art.price}</h3>
						<h3>{art.category}</h3>
						
					</div>
				);
			})}
		</>
	);
};

export default ArtGallery;
