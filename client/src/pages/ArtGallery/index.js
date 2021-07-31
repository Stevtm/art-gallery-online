import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../../utils/queries';
//import axios from 'axios';
import './style.css';
import SearchBar from '../../components/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  createTheme,
  Timeline,
  themes,
  Events,
  UrlButton,
  ImageEvent,
} from '@merc/react-timeline';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: '#fffff',
  },
  date: {
    backgroundColor: '#000000',
  },
  marker: {
    borderColor: '#000000',
    border: '2px solid #000000',
  },
  timelineTrack: {
    backgroundColor: '#000000',
  },
  UrlButton: {
    color: '#000000',
  },
});

const ArtGallery = () => {
  // query for art data
  const { loading, data } = useQuery(QUERY_ART);
  // const imgData = useQuery(QUERY_IMAGE);

  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery;

  // console.log(imgData);

  const artData = data?.art || [];

  console.log(artData);

  const filterArt = (artData, query) => {
    if (!query) {
      return artData;
    }

    return artData.filter((art) => {
      const artDescription = art.description.toLowerCase();
      return artDescription.includes(query);
    });
  };

  const filteredArt = filterArt(artData, query);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div id="gallery">
        <h1 className="pt-3 text-center font-details-b pb-3">GALLERY</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></SearchBar>
        <Router>
          <Accordion>
          <Card>
            <Card.Body>
              {filteredArt.map((art) => {
                // This should probably be broken out into its own react component
                return (
                  <div key={art._id} className="d-flex justify-content-between flex-column mt-1">
                    <Accordion.Toggle>
                      <Card.Body>
                      <strong>Artist:</strong>
                      <h3>{art.user}</h3>
                      <strong>Title:</strong>
                      <h3>{art.title}</h3>
                      <strong>Description:</strong>
                      <h3>{art.description}</h3>
                      <strong>Price</strong>
                      <h3>${art.price}</h3>
                      <strong>Category:</strong>
                      <h3>{art.category}</h3>
                      <img
                        src={art.imgData}
                        alt="uploaded art"
                        width="300px"
                      ></img>
                      </Card.Body>
                    </Accordion.Toggle>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
          </Accordion>
        </Router>
      </div>
    </>
  );
};

export default ArtGallery;
