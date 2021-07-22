import React from "react";
import MyNavbar from "./components/navbar/navbar.component";
import ArtCarousel from "./components/carousel/carousel.component";
import ArtGallery from "./pages/gallery/gallery";
import Fade from "react-reveal/Fade"
import Container from "react-bootstrap/Container";
import "./App.css";

const App = () => {
  return (
    <div className="App" style={{ position: "relative" }}>
      <MyNavbar />
      <ArtCarousel />

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
