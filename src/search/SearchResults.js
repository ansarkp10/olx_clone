import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, FirebaseContext } from '../store/Context'; // Ensure this path is correct
import { useLocation, useHistory } from 'react-router-dom'; 
import { PostContext } from '../store/PostContext'; // Ensure this import is correct
import Header from '../Components/Header/Header';
import './SearchResults.css';

const SearchResults = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { setPostDetails } = useContext(PostContext); // Accessing PostContext
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get query from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // Create history object

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const snapshot = await firebase.firestore().collection('products').get();
        const allProducts = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        
        // Filter products based on the search query
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [firebase, query]);

  // Modified handleProductClick function
  const handleProductClick = (product) => {
    setPostDetails(product); // Set the post details in context
    history.push('/view'); // Redirect to the view page
  };

  return (
    <div className="searchResultsContainer">
      <Header /> {/* Include the Header component */}
      <h2>Search Results for: "{query}"</h2>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="results">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="productCard" key={product.id} onClick={() => handleProductClick(product)}> {/* Added onClick handler */}
                <img src={product.url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: &#x20B9; {product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
