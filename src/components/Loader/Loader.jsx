import React from 'react';
import './Loader.css';

const Loader = ({ size = 'md', fullScreen = false }) => {
  const loaderClass = `loader loader-${size}`;
  
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className={loaderClass}></div>
      </div>
    );
  }

  return <div className={loaderClass}></div>;
};

export default Loader;
