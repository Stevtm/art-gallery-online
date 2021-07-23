import React, { useState, Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/icon/logo.jpg"
import "../navbar/navbar.style.css";
// import LoginForm from "../LoginForm";
import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';

const MyNavbar = (props) => {

  
  const {setShowModal, showModal}= props;
  // setShowModal(prev => !prev)

  const Bbb = () => {
    // const [showModal, setShowModal]= useState(false);
    
    
    console.log("Login Man clicked");
    
  //   return(
  //     <LoginForm showModal= {showModal} setShowModal= {setShowModal}></LoginForm>
  //   )
  };


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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#artists">Artists</Nav.Link>
              <Nav.Link href="#paintings">Paintings</Nav.Link>
              <Nav.Link href="#photography">Photography</Nav.Link>
              <Nav.Link href="#login" onClick={() => Bbb(true)}><i class="far fa-user" ></i></Nav.Link>
              <Link to="/login" >link</Link>
              
              <Nav.Link href="#favourites"><i class="far fa-heart"></i></Nav.Link>
              <Nav.Link href="#search"><i class="fas fa-search"></i></Nav.Link>
              <Nav.Link href="#shop"><i class="fas fa-shopping-cart"></i></Nav.Link>
            </Nav>
            <LoginForm showModal= {showModal} setShowModal= {setShowModal}></LoginForm>
          </Navbar.Collapse>
        </Navbar>
        
        </div>
      </>
    );
  };
  
  export default MyNavbar;
