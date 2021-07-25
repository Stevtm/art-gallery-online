import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/icon/logo.jpg";
import "./style.css";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const PageNav = () => {
	const showNav = () => {
		// check if the user is logged in
		if (Auth.loggedIn()) {
			return (
				<>
					<Link to="/profile">My Profile</Link>
					<a href="/" onClick={() => Auth.logout()}>
						Logout
					</a>
				</>
			);
		} else {
			return (
				<>
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</>
			);
		}
	};

	return (
		<div>
			<Navbar
				fixed="top"
				collapseOnSelect
				expand="md"
				variant="dark"
				className="animate-navbar nav-theme justify-content-between"
			>
				<Navbar.Brand href="#home">
					<img className="logo" src={Logo} alt="Art Gallery Logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Link to="/">Home</Link>
						{showNav()}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default PageNav;
