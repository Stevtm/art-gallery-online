import React from "react";
import { createTheme, Timeline, themes, Events, UrlButton, ImageEvent } from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Image1 from "../../assets/img/gallery/Image1.jpg";
import Image2 from "../../assets/img/gallery/Image2.jpg";


import "./gallery.style.css";

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: '#fffff'
  },
  date: {
    backgroundColor: '#000000',
  },
  marker: {
    borderColor: '#000000',
    border: '2px solid #000000'
  },
  timelineTrack: {
    backgroundColor: '#000000',
  },
  UrlButton: {
    color: '#000000'
  }
});

const ArtGallery = () => {
  return (
    <div id="gallery">
      <h1 className="pt-3 text-center font-details-b pb-3">ART GALLERY</h1>
      <Timeline theme={customTheme}>
        <Events>
          <ImageEvent
            date="00/00/0000"
            className="text-center"
            text="Image 1"
            src={Image1}
            alt="Image 1"
          >
            <div className="d-flex justify-content-between flex-column mt-1">
              <div>
                <Accordion>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="0"
                      className="p-2 text-center accordian-main"
                    >
                      ART DETAILS
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0" className="text-left">
                      <Card.Body>
                        <strong>Description:</strong> (Insert Artist Description)
                        
                        <hr />
                        <strong>Artist:</strong>
                        <ul className="list-styles pt-1">
                          <li>(Insert Artist's Name)</li>
                        </ul>
                        <hr />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton
                  href=""
                  target="_blank"
                >
                  SEE ARTIST
                </UrlButton>
                <UrlButton
                  href=""
                  target="_blank"
                >
                  SEE ART PIECE
                </UrlButton>
              </div>
            </div>
          </ImageEvent>

          <ImageEvent
            date="06/03/2021"
            className="text-center"
            text="Image 2"
            src={Image2}
            alt="Image 2"
          >
            <div className="d-flex justify-content-between flex-column mt-1">
              <div>
                <Accordion>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="0"
                      className="p-2 text-center accordian-main"
                    >
                      ART DETAILS
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0" className="text-left">
                      <Card.Body>
                        <strong>Description:</strong> (Insert Art Description)
                        <hr />
                        <strong>Artist:</strong>
                        <ul className="list-styles pt-1">
                          <li>(Insert Artist Name)</li>
                        </ul>
                        <hr />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton
                  href=""
                  target="_blank"
                >
                  SEE ARTIST
                </UrlButton>
                <UrlButton
                  href=""
                  target="_blank"
                >
                SEE ART PIECE
                </UrlButton>
              </div>
            </div>
          </ImageEvent>

          
        </Events>
      </Timeline>
    </div>
  );
};

export default ArtGallery;