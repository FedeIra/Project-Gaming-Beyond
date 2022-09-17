import React from 'react';
import { Link } from 'react-router-dom';
// import landingImage from '../assets/landingImage.jpg';

// import image videogame.png:

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to VideoGames Web!</h1>
      <Link to="/videogames">
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default LandingPage;
