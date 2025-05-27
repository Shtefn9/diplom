import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">Last.fm</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Music</a>
          <a href="#" className="nav-link">Events</a>
          <a href="#" className="nav-link">Charts</a>
          <a href="#" className="nav-link">Library</a>
          <a href="#" className="nav-link">Features</a>
        </nav>
        <div className="header-right">
          <button className="search-btn">🔍</button>
          <button className="profile-btn">👤</button>
        </div>
      </div>
    </header>
  );
};

export default Header;