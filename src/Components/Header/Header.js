import React, { useContext, useState } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const [searchQuery, setSearchQuery] = useState('');

  // Handle logout
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  // Handle login click
  const handleLoginClick = () => {
    history.push('/login'); // Redirect to the login page
  };

  // Handle sell button click
  const handleSellClick = () => {
    history.push('/create'); // Navigate to the Create page
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  // Handle search action
  const handleSearch = () => {
    if (searchQuery.trim()) {
      history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="India" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="searchAction" onClick={handleSearch} style={{ cursor: 'pointer' }}>
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span onClick={!user ? handleLoginClick : null} style={{ cursor: user ? 'default' : 'pointer' }}>
            {user ? user.displayName : 'Login'}
          </span>
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent" onClick={handleSellClick} style={{ cursor: 'pointer' }}>
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
