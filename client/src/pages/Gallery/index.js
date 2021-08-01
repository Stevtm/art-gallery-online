import React from "react";
import {
	createTheme,
	Timeline,
	themes,
	Events,
	UrlButton,
	ImageEvent,
} from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { QUERY_ART } from "../../utils/queries";
import { useQuery } from "@apollo/client";
// import Image from "react-bootstrap/Image";
// import Image1 from "../../assets/img/gallery/Image1.jpg";
// import Image2 from "../../assets/img/gallery/Image2.jpg";
// import Image3 from "../../assets/img/gallery/Image3.jpg";
// import Image4 from "../../assets/img/gallery/Image4.jpg";

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
	const { loading, data } = useQuery(QUERY_ART);

	const recentArt = data?.art || [];

	// create array of the 4 most recent posts
	const fourMostRecent = [];

	for (let i = 1; i < 5; i++) {
		fourMostRecent.push(recentArt[recentArt.length - i]);
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div id="gallery">
			<h1 className="pt-3 text-center font-details-b pb-3">RECENT UPLOADS</h1>
			<Timeline theme={customTheme}>
				<Events>
					{fourMostRecent.map((art) => {
						return (
							<ImageEvent
								date={art.createdAt}
								className="text-center"
								text={art.title}
								src={art.imgData}
								alt="Image 1"
							>
								<div className="d-flex justify-content-between flex-column mt-1">
									<div>
										<Accordion>
											<Card>
												<Accordion.Toggle
													as={Card.Header}
													eventKey="0"
													className="p-2 text-center accordian-main"
												>
													ART DETAILS
												</Accordion.Toggle>

												<Accordion.Collapse eventKey="0" className="text-left">
													<Card.Body>
														<strong>Description:</strong> {art.description}
														<hr />
														<strong>Artist:</strong> {art.user}
														<hr />
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</div>
									<div className="d-flex justify-content-between flex-nowrap text-center">
										<UrlButton href={`/profile/${art.user}`}>
											SEE ARTIST
										</UrlButton>
										<UrlButton href="" target="_blank">
											BUY FOR ${art.price.toFixed(2)}
										</UrlButton>
									</div>
								</div>
							</ImageEvent>
						);
					})}
				</Events>
			</Timeline>
		</div>
	);
};

export default Gallery;
