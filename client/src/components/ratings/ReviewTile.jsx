import React, { useState, useEffect } from 'react';
import StarRating from '../StarRating.jsx';

const findLS = (id) => {
  var res = localStorage.getItem('rid' + id);
  return res !== null;
};

const putLS = (id) => {
  localStorage.setItem('rid' + id, 'true');
};
//changes

const ReviewTile = (props) => {
  const [imgModal, setModal] = useState(-1);
  const [helpful, setHelpful] = useState(findLS(props.review.review_id));
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if(imgModal !== -1) {
      window.addEventListener('click', handleModal);
      return () => {
        window.removeEventListener('click', handleModal);
      }
    }
  }, [imgModal]);

  const handleModal = (e) => {
    if(!e.path.some(e => e.className === 'img-modal')) {
      props.toggleOverlay();
      setModal(-1);
    }
  }

  var out;
  if (props.search.length >= 3) {
    var re = RegExp('(' + props.search + ')', 'i');
    var arr = props.review.body.split(re);
    out = [];
    let len = arr.length;
    for (let i = 0; i < len; i += 2) {
      out.push(arr[i]);
      out.push(<mark key={i}>{arr[i + 1]}</mark>)
    }
  } else {
    out = props.review.body;
  }

  const openModal = (idx) => {
    if (imgModal === -1) {
      props.toggleOverlay();
      setModal(idx);
    }
  };

  const handleHelpful = () => {
    if (!helpful) {
      props.putHelpful(props.review.review_id);
      putLS(props.review.review_id);
      setHelpful(true);
      setClicked(true);
    }
  };
  //create row for each review tile
  return <tr >
    <td>
      <div className='review-elem'>
        <div className='review-stars'><StarRating rating={props.review.rating} key={props.review.review_id} /></div>
        <span className='tile-reviewer'>{props.review.reviewer_name}</span>
        <span className='tile-date'>{new Date(props.review.date).toLocaleDateString({},
          { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" })}</span>
        <span className='tile-summary'>{props.review.summary}</span>
        <span className='tile-body'>{out}</span>
        <span className='tile-recommend'>{props.review.recommend ? '✓ I recommend this product' : null}</span>
        {props.review.response ? <span className='tile-response'>Response: {props.review.response}</span> : null}
        <span className='tile-helpful'>Helpful? <button disabled={helpful} onClick={handleHelpful} className='helpful-button' value='Yes'>Yes</button>({props.review.helpfulness + (clicked ? 1 : 0)})</span>
        <span className='tile-images'>{props.review.photos.map((p, idx) => <img key={p.id} id={p.id} src={p.url} width={50} height={50} alt={'review image' + idx} onClick={e => openModal(idx)}></img>)}</span>
        {imgModal !== -1 ? <ImageModal idx={imgModal} photos={props.review.photos} /> : null}
      </div>
    </td>
  </tr>;
};


const ImageModal = (props) => {
  const [mainIndex, setIndex] = useState(-1);

  const changePhoto = (idx) => {
    setIndex(idx);
  };
  let index = mainIndex === -1 ? props.idx : mainIndex;
  if (props.idx !== -1) {
    return (<div className='img-modal'>
      <div className='main'><img src={mainIndex === -1 ? props.photos[props.idx].url : props.photos[mainIndex].url} alt='review image'/></div>
      <div className='tray'>{props.photos.map((p, idx) => {
        return  <img src={p.url} className={idx === index ? 'thumb selected' : 'thumb' } alt='review thumbnail' width={64} height={64} onClick={() => changePhoto(idx)}/>
      })}</div>
    </div>)
    return
  }
  return null;
};

export default ReviewTile;