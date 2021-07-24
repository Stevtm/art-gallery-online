import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/icon/logo.jpg";
import "./style.css";
import { Link } from "react-router-dom";

const PageNav = (props) => {
	return (
		<>
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
							{/* <Nav.Link href="#home">Home</Nav.Link> */}
							<Link to="/">Home</Link>
							{/* <BootstrapNav.Link href="#gallery">Gallery</BootstrapNav.Link>
							<BootstrapNav.Link href="#paintings">Paintings</BootstrapNav.Link>
							<BootstrapNav.Link href="#photography"> */}
							Photography
							{/* </BootstrapNav.Link> */}
							<Link to="/login">
								<i class="far fa-user"></i>
							</Link>
							{/* <BootstrapNav.Link href="#search">
								<i class="fas fa-search"></i>
							</BootstrapNav.Link>
							<BootstrapNav.Link href="#shop">
								<i class="fas fa-shopping-cart"></i>
							</BootstrapNav.Link> */}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</>
	);
};

export default PageNav;
