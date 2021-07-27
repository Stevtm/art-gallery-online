import React, { useState } from 'react';
const multer = require('multer');
const axios = require('axios');

const ImageUpload = () => {
  const [multerImage, setMulterImage] = useState('');
  const [setFormState, imgName] = useState({
    imgName: '',
    imgData: ''
  })

  const uploadImage = (e, method) => {
    let imageObj = {};

    let imageFormObj = new FormData();

    imageFormObj.append('imgName', 'multer-image-' + Date.now());
    imageFormObj.append('imgData', e.target.files[0]);

    

    setMulterImage({
      multerImage: URL.createObjectURL(e.target.files[0])
    });

    console.log(URL.createObjectURL(e.target.files[0]));

    axios
      .post(`http://localhost:3000/image/uploadmulter`, imageFormObj, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((data) => {
        if (data.data.success) {
          alert('Image has been successfully uploaded using multer');
        }
      })
      .catch((err) => {
        alert('Error while uploading image');
      });
  };

  return (
    <div>
      <div>
        <h4>Upload</h4>
        <p>Test of an upload to our server.</p>

        <input type="file" onChange={(e) => uploadImage(e, multer)} />
        <img src={multerImage} alt="upload-image" />
      </div>
    </div>
  );
};

export default ImageUpload;
