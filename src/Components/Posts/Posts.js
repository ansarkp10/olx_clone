import React, { useState, useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();
  
  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });
      setProducts(allPost);
      setLoading(false); // Set loading to false when data is fetched
    });
  }, [firebase]);

  const handleProductClick = (product) => {
    setPostDetails(product);
    history.push('/view'); // Redirect to the view page
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Fresh recommendations</span>
          <span>View more</span>
        </div>

        {loading ? (
  <div className="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
) : (
  <div className="cards">
    {products.map((product) => (
      <div className="card" key={product.id} onClick={() => handleProductClick(product)}>
        <div className="favorite">
          <Heart />
        </div>
        <div className="image">
          <img src={product.url} alt={product.name} />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="kilometer">{product.category}</span>
          <p className="name"> {product.name}</p>
        </div>
        <div className="date">
          <span>{product.createdAt}</span>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}

export default Posts;
