import React, { useState } from "react";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import MyNavbar from "./components/navbar/navbar.component";
import ArtCarousel from "./components/carousel/carousel.component";
import ArtGallery from "./pages/gallery/gallery";
import Title from "./components/title/title.component";
import Fade from "react-reveal/Fade"
import Container from "react-bootstrap/Container";
import "./App.css";
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App" style={{ position: "relative" }}>
      <MyNavbar />
      <ArtCarousel />
      <Title />

      <div>
        <Container className="container-box rounded">
          <Fade duration={500}>
            <hr />
            <ArtGallery />
          </Fade>
        </Container>
      </div>
    </div>
  );
};

export default App;
