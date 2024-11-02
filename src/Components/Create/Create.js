import React, { useState, Fragment, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  
  const handleSubmit = () => {
    if (image && user) {
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid, // Corrected to user.uid
            createdAt: date.toDateString()
          }).then(() => {
            console.log('Product added successfully');
            history.push("/"); // Redirect to home page after success
          }).catch((error) => {
            console.error('Error adding product: ', error);
          });
        });
      }).catch((error) => {
        console.error('Error uploading image: ', error);
      });
    } else {
      console.error('Image or user not available');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the uploaded image file
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h2>Create a New Product</h2> {/* Main heading for the form */}

        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="Name"
          value={name} // Controlled input
          onChange={(e) => setName(e.target.value)} // Update state
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category} // Controlled input
          onChange={(e) => setCategory(e.target.value)} // Update state
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="price"
          value={price} // Controlled input
          onChange={(e) => setPrice(e.target.value)} // Update state
        />
        <br />

        <h3>Product Image</h3> {/* Subheading for image upload */}
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        <br />
        <input type="file" onChange={handleImageChange} />
        <br />
        <button onClick={handleSubmit} type="submit" className="uploadBtn">Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
