import React, { useEffect } from "react";

const Success = () => {
	useEffect(() => {
		setTimeout(() => {
			window.location.assign("/");
		}, 3000);
	});

	return (
		<>
			<h1>Payment Successful! Thank you for shopping!</h1>
		</>
	);
};

export default Success;
