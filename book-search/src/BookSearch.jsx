

import React, { useState } from 'react';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        /* Video background styling */
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -1;
          filter: brightness(0.4) contrast(1.1);
        }
        .app-container {
          position: relative;
          min-height: 100vh;
          padding: 40px 20px;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(4px);
          background: rgba(0,0,0,0.3);
          overflow-y: auto;
          z-index: 1;
        }
        .search-box {
          margin-bottom: 40px;
          display: flex;
          gap: 10px;
        }
        input[type="text"] {
          padding: 12px 15px;
          font-size: 18px;
          border-radius: 8px;
          border: none;
          outline: none;
          width: 320px;
          box-shadow: 0 0 10px rgba(255 255 255 / 0.3);
          transition: box-shadow 0.3s ease;
          background: rgba(255 255 255 / 0.9);
          color: #333;
        }
        input[type="text"]:focus {
          box-shadow: 0 0 15px rgba(255 255 255 / 0.6);
        }
        button {
          padding: 12px 25px;
          font-size: 18px;
          border-radius: 8px;
          border: none;
          background: #ffd700;
          color: #333;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: background 0.3s ease;
        }
        button:disabled {
          background: #bbb;
          cursor: not-allowed;
          color: #666;
        }
        button:not(:disabled):hover {
          background: #ffea00;
        }
        .book-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          width: 100%;
          max-width: 960px;
        }
        .book-card {
          background: rgba(0 0 0 / 0.6);
          border-radius: 15px;
          padding: 20px;
          color: #fff;
          box-shadow: 0 8px 20px rgba(0 0 0 / 0.7);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .book-card h3 {
          margin: 0 0 10px 0;
          font-size: 22px;
        }
        .book-card p {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 15px;
          flex-grow: 1;
        }
        .book-card a {
          color: #ffd700;
          font-weight: bold;
          text-decoration: none;
          align-self: flex-start;
          transition: color 0.3s ease;
        }
        .book-card a:hover {
          color: #fff;
        }
      `}</style>

      {/* 🔥 Updated video src to /book.mp4 in public folder */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        src="/book1.mp4"
      >
        Your browser does not support the video tag.
      </video>

      <div className="app-container">
        <h2>Search for Books</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter book title, author, or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchBooks} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
              <p>
                {book.volumeInfo.description
                  ? book.volumeInfo.description.slice(0, 120) + '...'
                  : 'No description available.'}
              </p>
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BookSearch;
