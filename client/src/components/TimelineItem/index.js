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
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";

import { QUERY_CHECKOUT } from "../../utils/queries";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const TimelineItem = ({ art }) => {
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

	function submitCheckout(art) {
		getCheckout({
			variables: {
				checkoutProduct: art,
			},
		});
	}
	return (
		<ImageEvent
			date={art.createdAt}
			className="text-center"
			text={art.title}
			src={art.imgData}
			alt="Image 1"
			key={art._id}
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
				<div
					className="d-flex justify-content-between flex-nowrap text-center"
					key={art._id}
				>
					<UrlButton href={`/profile/${art.user}`}>SEE ARTIST</UrlButton>
					<UrlButton target="_blank">BUY FOR ${art.price.toFixed(2)}</UrlButton>
				</div>
			</div>
		</ImageEvent>
	);
};

export default TimelineItem;