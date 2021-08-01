import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ART } from "../../utils/queries";
//import axios from 'axios';
import "./style.css";
import SearchBar from "../../components/Search";
import ArtCard from "../../components/ArtCard";

const ArtGallery = () => {
	// query for art data
	const { loading, data } = useQuery(QUERY_ART);
	// const imgData = useQuery(QUERY_IMAGE);

	const [searchQuery, setSearchQuery] = useState("");
	const query = searchQuery;

	// console.log(imgData);

	const artData = data?.art || [];

	if (artData.length === 0) {
		return <h2 className="text-center">No art found!</h2>
	}

	const filterArt = (artData, query) => {
		if (!query) {
			return artData;
		}

		return artData.filter((art) => {
			const artDescription = art.description.toLowerCase();
			return artDescription.includes(query);
		});
	};

	const filteredArt = filterArt(artData, query);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<div id="gallery">
				<h2 className="pt-3 text-center font-details-b pb-3">ART GALLERY</h2>
				<SearchBar
					className="search"
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				></SearchBar>
				<div className="row-cols-md-1 g-4">
					<div className="col card-container">
						{filteredArt
							.slice(0)
							.reverse()
							.map((art) => {
								return <ArtCard art={art} key={art._id}></ArtCard>;
							})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ArtGallery;
