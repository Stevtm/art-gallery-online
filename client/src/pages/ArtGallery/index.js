import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../../utils/queries';
import axios from 'axios';
import './style.css';
import SearchBar from '../../components/Search';
import { BrowserRouter as Router } from 'react-router-dom';

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
      const artTitle = art.title.toLowerCase();
      return artTitle.includes(query);
    });
  };

  const filteredArt = filterArt(artData, query);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
      <>
        <b>Gallery</b>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></SearchBar>
        <Router>
        {filteredArt.map((art) => {
          // This should probably be broken out into its own react component
          return (
            <div key={art._id} className="temp">
              <h3>{art.title}</h3>
              <h3>{art.description}</h3>
              <h3>${art.price}</h3>
              <h3>{art.category}</h3>
              <img src={art.imgData} alt="uploaded art" width="300px"></img>
            </div>
          );
        })}
        </Router>
      </>
    
  );
};

export default ArtGallery;
