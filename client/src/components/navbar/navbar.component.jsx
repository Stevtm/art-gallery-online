import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/icon/logo.jpg"
import "../navbar/navbar.style.css";

const MyNavbar = () => {
    return (
      <>
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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#paintings">Paintings</Nav.Link>
              <Nav.Link href="#photography">Photography</Nav.Link>
              <Nav.Link href="profile"><i class="far fa-user"></i></Nav.Link>
              <Nav.Link href="#favourites"><i class="far fa-heart"></i></Nav.Link>
              <Nav.Link href="#search"><i class="fas fa-search"></i></Nav.Link>
              <Nav.Link href="#shop"><i class="fas fa-shopping-cart"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  };
  
  export default MyNavbar;
