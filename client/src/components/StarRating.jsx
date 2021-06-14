import React from 'react';
import star from '../imgs/star.png';

const StarRating = ({ rating }) => {
  var stars = [];
  for(var i = 0; i < 5; i++) {
    if(rating >= 1) {
      stars.push(1.0);
      rating -= 1;
    } else if (rating >= 0.75) {
      stars.push(0.67)
      rating -= 0.75
    } else if (rating >= 0.5) {
      stars.push(0.55);
      rating -= 0.5;
    } else if (rating >= 0.25) {
      stars.push(0.4);
      rating -= 0.25;
    } else {
      stars.push(0);
    }
  }

  return (
    <React.Fragment>
      {stars.map((item, i) => (
        <div className='star-container' key={i}>
            <div className='star-fill' style={{'width': `${parseInt(item*15)}px`}}>
                <img className='star' src={star} alt='stars alt'></img>
            </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default StarRating;