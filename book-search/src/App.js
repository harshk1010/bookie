

import React from 'react';
import './App.css';
import BookSearch from './BookSearch';

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted className="background-video">
        <source src="bookBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div> {/* Optional overlay */}
      <div className="content">
        <h1 className="app-title">📖 Bookie : A Book Finder</h1>
        <BookSearch />
      </div>
    </div>
  );
}

export default App;
