import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import AvgRating from './AvgRating.jsx';
import lightLogo from '../imgs/lightLogo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
      idArr: [
        13031,
        13029,
        13024,
        13023
      ]
    }

    this.handleItem = this.handleItem.bind(this);
  }

  handleItem(event) {
    this.setState({ product: event.target.innerText });
  }

  render() {
    return (
      <div>
      <nav className='navbar'>
        <img id='logo' src={lightLogo} alt='Company Logo'></img>
      </nav>
      <div className='announcement-container'>
        <span className='announcement'>SITE-WIDE ANNOUNCEMENT MESSAGE! ─	SALE / DISCOUNT <b>OFFER</b> ─ NEW PRODUCT HIGHLIGHT</span>
      </div>
      <div>

        <Overview />
        <Ratings id={this.state.product} />
        <RICWidget
          productId={this.state.product} />
      </div>
      </div>
    );
  }
};


export default App;