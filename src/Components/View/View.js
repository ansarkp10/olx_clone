import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
  console.log("Post details:", postDetails); // Check if userId is defined
  if (postDetails && postDetails.userId) {
    const { userId } = postDetails;
    firebase.firestore().collection('olxusers').where('id', '==', userId).get()
    .then((res) => {
      res.forEach((doc) => {
        setUserDetails(doc.data());
      });
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
    });
  }
}, [postDetails, firebase]);


  if (!postDetails) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails ? userDetails.username : 'Loading seller name...'}</p>
          <p>{userDetails ? userDetails.phone : 'Loading contact...'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
