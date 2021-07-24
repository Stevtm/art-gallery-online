import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide1 from "../../assets/img/carousel/slide1.jpg";
import Slide2 from "../../assets/img/carousel/slide2.jpg";
import Slide3 from "../../assets/img/carousel/slide3.jpg";
import Slide4 from "../../assets/img/carousel/slide4.jpg";
import Slide5 from "../../assets/img/carousel/slide5.jpg";
import Slide6 from "../../assets/img/carousel/slide6.jpg";
import Slide7 from "../../assets/img/carousel/slide7.jpg";

import "./carousel.style.css";

const ArtCarousel = () => {
  return (
    <div id="home">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide4}
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide5}
            alt="Fifth slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide6}
            alt="Sixth slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide7}
            alt="Seventh slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ArtCarousel;
