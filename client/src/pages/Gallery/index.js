import React from "react";
import { createTheme, Timeline, themes, Events } from "@merc/react-timeline";
import TimelineItem from "../../components/TimelineItem";
import { QUERY_ART } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import "./style.css";

const customTheme = createTheme(themes.default, {
	card: {
		backgroundColor: "#fffff",
	},
	date: {
		backgroundColor: "#000000",
	},
	marker: {
		borderColor: "#000000",
		border: "2px solid #000000",
	},
	timelineTrack: {
		backgroundColor: "#000000",
	},
	UrlButton: {
		color: "#000000",
	},
});

const Gallery = () => {
	const { loading, data: artData } = useQuery(QUERY_ART);

	const recentArt = artData?.art || [];

	// create array of the 4 most recent posts
	const fourMostRecent = [];

	if (recentArt.length < 4) {
		return <h2>No art found!</h2>;
	}

	for (let i = 1; i < 5; i++) {
		fourMostRecent.push(recentArt[recentArt.length - i]);
		console.log("four most recent", fourMostRecent);
		console.log("recent art", recentArt);
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div id="gallery">
			<h2 className="pt-3 text-center font-details-b pb-3">RECENT UPLOADS</h2>
			<Timeline theme={customTheme}>
				<Events>
					{fourMostRecent.map((art) => {
						return <TimelineItem art={art} key={art._id}></TimelineItem>;
					})}
				</Events>
			</Timeline>
		</div>
	);
};

export default Gallery;
