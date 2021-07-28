import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ART } from "../../utils/queries";
import "./style.css";

const ArtGallery = () => {
	// query for art data
	const { loading, data } = useQuery(QUERY_ART);

	const artData = data?.art || [];
	console.log(artData);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<b>Gallery</b>
			{artData.map((art) => {
				// This should probably be broken out into its own react component
				return (
					<div className="temp">
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
