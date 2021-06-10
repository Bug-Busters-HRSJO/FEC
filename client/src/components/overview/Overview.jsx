import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import Cart from './Cart.jsx';
import Atelier from '../../Atelier.js';
import { auth } from '../../../../config.js';

/*
Need to get ONE product from the database
With that one product id we need to get all the STYLES that the product has
Styles contains all the pictures related to the styles. Also contains all the sales pricing for the style.
Styles also contains all the inventory of the product styles
*/
function Overview (props) {
  // const [cartItems, serCurrentCart] = await useState({}) need to pull a user's cart
  // const [productList, setProductList] = useState(sampleData); don't think this is necessary.
  const [currentProduct, setCurrentProduct] = useState({});
  const [styleId, setStyleId] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [styles, setStyleList] = useState([]);
  const [style, setStyle] = useState({});
  const [currentPhoto, setPhoto] = useState('');

  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true);
        var product = await Atelier.getInfo(13023).catch((err) => console.log(err));
        var styleList = await Atelier.getStyles(13023).catch((err) => console.log(err));
        setStyleList(styleList.results);
        setStyle(styleList.results[0]);
        setCurrentProduct(product);
        setStyleId(styleList.results[0].style_id)
        setLoading(false);
      } catch (err) {
        console.log(err)
      }}
    fetchData();
    }, []);

    // useEffect(() => {
    // }, [style])

  function handleStyleSelect (value) {
    let list = styles;
    for (var i = 0; i < list.length; i++) {
      if (list[i].style_id === Number(value)){
        setStyle(list[i]);
        return;
      }
    }
  }

  return (
    <div data-testid="overview-1" className='overview'>
      Overview

      {isLoading
        ? null
        : <ImageGallery
          key='999999'
          className='image-gallery'
          photos={ style.photos }
          styleid={ styleId }
        />
      }

      {isLoading
        ? null
        : <Cart
        key='899999'
        stylesList={ styles }
        style={ style }
        handleStyleSelect={ handleStyleSelect }
        defaultPrice={ currentProduct.default_price }
        />
      }


      <button>
        Facebook
      </button>
      <button>
        Twitter
      </button>
      <button>
        Pinterest
      </button>
    </div>)

}


export default Overview;
