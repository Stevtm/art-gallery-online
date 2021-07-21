import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image1 from "../../assets/img/gallery/Image1.jpg"


import "./gallery.style.css";

const ArtGallery = () => {
  return (
    <div id="gallery">
      <div className="gallery">
        <h1 className="pt-3 text-center font-details pb-3">
          Buy Original Art Online!!
        </h1>
        <Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row className="pt-3 pb-5 align-items-center">
            <Col xs={12} md={8}>
            <img
                  className="profile justify-content-end"
                  alt="image1"
                  src={Image1}
                  rounded
                  fluid
                />
            </Col>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
          </Row>

          {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
          <Row>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
          </Row>

          {/* Columns are always 50% wide, on mobile and desktop */}
          <Row>
            <Col xs={6}>xs=6</Col>
            <Col xs={6}>xs=6</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ArtGallery;