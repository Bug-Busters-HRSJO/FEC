import React from 'react';

function Thumbnail (props) {

  function getPhotoInfo (e) {
    var url = e.target.getAttribute('photo-url');
    var thumbnail_url = e.target.src;

    for (var i = 0; i < props.photoList.length; i++) {
      if (props.photoList[i].url === url) {
        var index = i;
        break;
      }
    }
    props.handleThumbnailClick(url, thumbnail_url, index);
  }

  return (
    <img
    className='thumbnail'
    src={props.thumbnailUrl}
    photo-url={props.photoUrl}
    onClick={(e) => getPhotoInfo(e)}></img>
  )
}

export default Thumbnail;