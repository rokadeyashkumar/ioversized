import React from 'react';
import './style/error.scss';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a href="/" className="home-button">Go to Homepage</a>
      </div>
    </div>
  );
}

export default Error;
