import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ART, QUERY_IMAGE } from "../../utils/queries";

const ArtGallery = () => {
	// query for art data
	const { loading, data } = useQuery(QUERY_ART);
	const imgData = useQuery(QUERY_IMAGE);

	console.log(imgData);

	const artData = data?.art || [];

	if (loading) {
		return <h2>Loading...</h2>;
	}

	

	return (
		<>
			<h1>Gallery</h1>
			{artData.map((art) => {
				// This should probably be broken out into its own react component
				return (
					<div className="temp">
						<h3>{art.title}</h3>
						<h3>{art.description}</h3>
						<h3>${art.price}</h3>
						<h3>{art.category}</h3>
						<h3>{art.imgName}</h3>
					</div>
				);
			})}
		</>
	);
};

export default ArtGallery;
