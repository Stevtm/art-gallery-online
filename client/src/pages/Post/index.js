import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ART } from '../../utils/mutations';
const multer = require('multer');
const axios = require('axios');

const Post = () => {

  // create state for holding form data
  const [formState, setFormState] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  // mutation configuration
  const [addArt, { error }] = useMutation(ADD_ART);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form to add art
  const handleFormSubmit = async (event) => {
    // stop the page from reloading
    event.preventDefault();

    // check that all form elements have been populated, return if they haven't
    let formFilled = true;

    Object.values(formState).forEach((input) => {
      if (!input.length > 0) {
        formFilled = false;
      }
    });

    if (!formFilled) {
      alert('Please fill out all of the required fields.');
      return;
    }

    // add art in database
    try {
      const { data } = await addArt({
        variables: {
          addArtTitle: formState.title,
          addArtCategory: formState.category,
          addArtPrice: formState.price,
          addArtDescription: formState.description,
        },
      });

      window.location.assign('/');
    } catch (err) {
      console.log(err);
    }
  }
  const [multerImage, setMulterImage] = useState('');

  const uploadImage = (e, method) => {
    let imageObj = {};

    let imageFormObj = new FormData();

    imageFormObj.append('imgName', 'multer-image-' + Date.now());
    imageFormObj.append('imgData', e.target.files[0]);

    setMulterImage({
      multerImage: URL.createObjectURL(e.target.files[0]),
    });

    console.log();

    axios
      .post(`http://localhost:3000/image/uploadmulter`, imageFormObj)
      .then((data) => {
        if (data.data.success) {
          alert('Image has been successfully uploaded using multer');
        }
      })
      .catch((err) => {
        alert('Error while uploading image');
      });
  }; 
  ;

  return (
    <>
      <h1>
        <b>Post New Art</b>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          id="title"
          type="text"
          value={formState.title}
          onChange={handleChange}
        ></input>
        <p>What type of art is it?</p>
        <input
          name="category"
          id="photograph"
          value="photograph"
          type="radio"
          onChange={handleChange}
        ></input>
        <label htmlFor="photograph">Photograph</label>
        <input
          name="category"
          id="drawing"
          value="drawing"
          type="radio"
          onChange={handleChange}
        ></input>
        <label htmlFor="drawing">Drawing</label>
        <input
          name="category"
          id="painting"
          value="painting"
          type="radio"
          onChange={handleChange}
        ></input>
        <label htmlFor="painting">Painting</label>
        <br></br>
        <label htmlFor="price">Price:</label>
        <input
          name="price"
          id="price"
          type="text"
          onChange={handleChange}
        ></input>
        <br></br>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
        ></textarea>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      <div>
        <div>
          <h4>Upload</h4>
          <input type="file" onChange={(e) => uploadImage(e, multer)} />
          <img src={multerImage} alt="upload-image" />
        </div>
      </div>
      );
    </>
  );
};

export default Post;
