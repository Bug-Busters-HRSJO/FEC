import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';



function ImageGallery (props) {
  // const [viewState, setView] = useState('default');
  const [currentPhoto, setPhoto] = useState(props.photos[0]);
  const [photoList, setPhotoList] = useState(props.photos);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhoto(props.photos[0]);
    setPhotoList(props.photos);
    setPhotoIndex(0);
  }, [props.photos]);

  function handleThumbnailClick (url, thumbnail_url, index) {
    setPhoto({
      url: url,
      thumbnail_url: thumbnail_url
      });
    setPhotoIndex(index);
  }

   function handleLeftClick () {
    if (photoIndex > 0) {
      let next = photoIndex - 1;
      setPhotoIndex(next);
      setPhoto(photoList[next]);
    }
  }

   function handleRightClick () {
    if (photoIndex < photoList.length - 1) {
      let next = photoIndex + 1;
      setPhotoIndex(next);
      setPhoto(photoList[next]);
    }
  }

  return (
    <div
    className='image-gallery'
    // onClick={() => setView( 'expanded' )}
    >
      <img className='preview' src={currentPhoto.url}></img>
      <div className='thumbnails'>
        {photoList.map(photo =>
          <Thumbnails
          key={photoList.indexOf(photo)}
          thumbnailUrl={photo.thumbnail_url}
          photoUrl={photo.url}
          photoList={photoList}
          handleThumbnailClick={handleThumbnailClick}/>
          )}
        </div>
      <button onClick={() => handleLeftClick()}>Left Arrow</button>
      <button onClick={() => handleRightClick()}>Right Arrow</button>
    </div>
  )
}

export default ImageGallery;