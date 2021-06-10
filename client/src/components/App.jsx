import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
// import RatingsReview from './RatingsReview.jsx';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holder: ''
    }
  }

  render() {
    return (
      <div>
        {/* <RatingsReview /> */}
        <Overview />
        {/* <Ratings id={13023} /> */}
      </div>
    );
  }
};


export default App;