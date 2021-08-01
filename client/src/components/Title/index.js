import React from "react";
import styled from "styled-components";

import "./style.css";

const TitleMessage = styled.h1`
	position: absolute;
	width: 100%;
	top: 28rem;
	z-index: 1;
	margin-top: -120px;
	text-align: center;
	font-weight: 200;
	color: #ffffff;
	font-family: "Italianno";
	strong {
		font-size: 1.25em;
	}
	div {
		color: #ffffff;
		text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
		font-weight: 300;
		letter-spacing: 5px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 200px;
		padding: 20px 40px;
		background: rgba(78, 44, 4, 0.5);
		.main {
			font-size: 50px;
		}
		.sub {
			font-size: 27px;
			letter-spacing: 2px;
		}
	}
`;

const Title = () => (
	<TitleMessage>
		<div className="titleMessage">
			<div className="heading">
				<div className="main text-center mb-3">
					<i className="fas fa-paint-brush"></i>
					<br />
					Art Gallery
					<br />
					<h1>Buy and Sell Authentic Art Online</h1>
				</div>
			</div>
		</div>
	</TitleMessage>
);

export default Title;
