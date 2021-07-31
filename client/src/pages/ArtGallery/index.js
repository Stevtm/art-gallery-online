import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../../utils/queries';
//import axios from 'axios';
import './style.css';
import SearchBar from '../../components/Search';

import { createTheme, themes } from '@merc/react-timeline';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


const ArtGallery = () => {
  // query for art data
  const { loading, data } = useQuery(QUERY_ART);
  // const imgData = useQuery(QUERY_IMAGE);

  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery;

  // console.log(imgData);

  const artData = data?.art || [];

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
        <div class="row-cols-md-1 g-4">
          <div class="col">
            <Card>
              {filteredArt.map((art) => {
                // This should probably be broken out into its own react component
                return (
                  <div key={art._id} className="card">
                    <Card.Body className="card-body">
                      <img
                        src={art.imgData}
                        className="card-img-top"
                        alt="uploaded art"
                      ></img>
                      <h5 className="card-title">Artist:</h5>
                      <p className="card-text">{art.user}</p>
                      <h5 className="card-title">Title:</h5>
                      <p className="card-text">{art.title}</p>
                      <h5 className="card-title">Description:</h5>
                      <p className="card-text">{art.description}</p>
                      <h5 className="card-title">Price:</h5>
                      <p className="card-text">${art.price.toFixed(2)}</p>
                      <h5 className="card-title">Category:</h5>
                      <p className="card-text">{art.category}</p>
                    </Card.Body>
                  </div>
                );
              })}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtGallery;
