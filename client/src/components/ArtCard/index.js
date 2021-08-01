import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./style.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const ArtCard = ({ art }) => {
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	function submitCheckout() {
		getCheckout({
			variables: {
				checkoutTitle: art.title,
				checkoutDescription: art.description,
				checkoutImgData: art.imgData,
				checkoutPrice: art.price,
			},
		});
	}

	const renderButtonsFunction = () => {
		if (window.location.href.includes("profile")) {
			return (
				<div className="buttons">
					<Button
						variant="primary"
						className="card-button"
						onClick={submitCheckout}
					>
						BUY FOR ${art.price.toFixed(2)}
					</Button>
				</div>
			);
		} else {
			return (
				<div className="buttons">
					<Button
						variant="secondary"
						className="card-button"
						href={`profile/${art.user}`}
					>
						SEE ARTIST
					</Button>
					<Button
						variant="primary"
						className="card-button"
						onClick={submitCheckout}
					>
						BUY FOR ${art.price.toFixed(2)}
					</Button>
				</div>
			);
		}
	};

	const renderButtons = renderButtonsFunction();

	return (
		<>
			<Card className="art-card">
				<Card.Img
					className="card-img"
					variant="top"
					src={art.imgData}
				></Card.Img>
				<Card.Body className="card-body">
					<Card.Title>{art.title}</Card.Title>
					<Card.Text>
						<b>Description: </b> {art.description}
						<b>Artist: </b> {art.user}
					</Card.Text>
					{renderButtons}
				</Card.Body>
			</Card>
		</>
	);
};

export default ArtCard;
