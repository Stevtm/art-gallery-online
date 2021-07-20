import React from "react";
import MyNavbar from "./components/navbar/navbar.component";
import ArtCarousel from "./components/carousel/carousel.component";
import "./App.css";

const App = () => {
  return (
    <div className="App" style={{ position: "relative" }}>
      <MyNavbar />
      <ArtCarousel />
      </div>

  );
};

export default App;
