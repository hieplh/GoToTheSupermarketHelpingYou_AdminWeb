import React from 'react';
import '../map/MarkerStyle.css';

const MarkerOnMap = (props) => {
    const { srcUrl, name, id } = props;
    return (
      <div>
          <img className='marker' src={srcUrl} alt="Logo" />;
      </div>
    );
  };

  export default MarkerOnMap;