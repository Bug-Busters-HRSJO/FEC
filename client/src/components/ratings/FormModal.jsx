import React, { useState } from 'react';

var characteristicBreakdown = {
  'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too big'],
  'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect',],
  'Quality': ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect',],
  'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
};


/*
Cute animals (FOR TESTING PURPOSES ONLY)
https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png
https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80
https://www.thesprucepets.com/thmb/kV_cfc9P4QWe-klxZ8y--awxvY4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg
https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*
https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/05/16/Pictures/_1571873a-58de-11e8-b431-73159b4b09e2.jpg
http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg
*/

const FormModal = (props) => {

  var charObj = {};
  for (var k in props.characteristics) {
    var id = props.characteristics[k].id;
    charObj[id] = -1;
  }
  const [formData, setData] = useState({ rating: -1, recommend: true, summary: '', body: '', name: '', email: '', photos: [], characteristics: charObj });
  const [errData, setErr] = useState({ rating: false, length: false, name: false, email: false, emailVal: false, char: {} })

  const [imgUrl, setUrl] = useState('');

  const handleChange = (value, field) => {
    setData(state => {
      var s = { ...state };
      s[field] = value;
      return s;
    })
  };

  const handleCharacteristicChange = (value, name) => {
    setData(state => {
      var obj = formData.characteristics;
      obj[props.characteristics[name].id] = value;
      return { ...state, characteristics: obj };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.submitData(formData);
    }
  };
  const validateForm = () => {
    var valid = true;
    var obj = {};
    if (formData.rating === -1) {
      obj.rating = true;
      valid = false;
    }
    if (formData.body.length < 50) {
      obj.length = true;
      valid = false;
    }
    if (formData.name.length === 0) {
      obj.name = true;
      valid = false;
    }
    if (formData.email.length === 0) {
      obj.email = true;
      valid = false;
    }
    if (formData.email.length > 0 && !/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(formData.email)) {
      obj.emailVal = true;
      valid = false;
    }
    var charErrors = {};
    for (var char in props.characteristics) {
      if (formData.characteristics[props.characteristics[char].id] === -1) {
        charErrors[char] = true;
        valid = false;
      } else {
        charErrors[char] = false;
      }
    }
    obj.char = charErrors;
    if (!valid) {
      setErr(e => {
        for(var k in e) {
          if(!obj[k]) {
            obj[k] = false;
          }
        }
        return {...obj};
      })
      return false;
    }
    return true;
  };

  const addImage = (e) => {
    if (!formData.photos.includes(imgUrl) && formData.photos.length < 5) {
      setData(state => {
        var obj = { ...state };
        obj.photos = [...obj.photos, imgUrl.trim()];
        return obj;
      });
    }
    setUrl('');
  };
  return (
    <div className='review-modal'>

      <form className='modal-form' onSubmit={handleSubmit}>
        <h2>Write Your Review</h2>
        <h4>About the {props.productName}</h4>
        <div>
          <label>Rating:</label> <RatingSelector onChange={val => handleChange(val, 'rating')} default={-1} />
          <div className={errData.rating ? 'form-error form-label' : 'form-label'}>{[null, 'Poor', 'Fair', 'Average', 'Good', 'Great'][formData.rating] || 'Select your overall rating'}</div>
        </div>
        <div>
          <label>Recommended: </label>
          <label>Yes</label><input type='radio' checked={formData.recommend} onChange={e => handleChange(e.target.value === 'on', 'recommend')}></input>
          <label>No</label><input type='radio' checked={!formData.recommend} onChange={e => handleChange(e.target.value === 'off', 'recommend')}></input>
        </div>
        <div>
          {Object.keys(props.characteristics).map(k => {
            return <div key={k}>
              <label>{k}:</label> <RatingSelector onChange={val => handleCharacteristicChange(val, k)} default={-1} />
              <div className={errData.char[k] ? 'form-error form-label' : 'form-label'}>{characteristicBreakdown[k][formData.characteristics[props.characteristics[k].id] - 1] || 'Select your rating for ' + k}</div>
            </div>
          })}
        </div>
        <div style={{overflow: 'hidden', marginBottom: '5px'}}>
          <span style={{float: 'left'}}>Summary: </span>
          <input style={{float: 'right'}} type='text' placeholder='Example: Best purchase ever!' value={formData.summary} onChange={e => handleChange(e.target.value, 'summary')} className='text-input'></input>
        </div>
        <div>
          <label style={{float: 'left'}}>Body: </label>
          <input style={{float: 'right'}} type='textarea' placeholder='Why did you like the product or not?' value={formData.body} onChange={e => handleChange(e.target.value, 'body')} className='text-input'></input>
          <div className='form-label'>{formData.body.length >= 50 ? <label>Minimum reached</label> : <span className={errData.length ? 'form-error' : ''}>Minimum required characters left: {50 - formData.body.length}</span>}</div>

        </div>
        <div>
          <label>Nickname: </label>
          <input style={{float: 'right'}} type='text' placeholder='Example: jackson11!' value={formData.name} onChange={e => handleChange(e.target.value, 'name')} className='text-input'></input>
          <div className='form-label'>{errData.name ? <span className='form-error'>Please enter your name. <br /></span>  : <span>For privacy reasons, do not use your full name or email address</span>}</div>
        </div>
        <div>
          <label >Email: </label>
          <input style={{float: 'right'}} type='text' placeholder='Example: jackson11@email.com' value={formData.email} onChange={e => handleChange(e.target.value, 'email')} className='text-input'></input>
          <div className='form-label'>{errData.email ? <span className='form-error'>Please enter your Email </span> : (errData.emailVal ? <span className='form-error'>Please make sure you have entered the correct email</span> :<span>For authentication reasons, you will not be emailed</span>)}</div>
        </div>
        <div className=''>
          <label>Images: </label>
          <input type='text' placeholder='Add Image URL Here' value={imgUrl} onChange={e => setUrl(e.target.value)} />
          <input type='button' value='Add Image' onClick={addImage} />
          {formData.photos.map((img, idx) => <img key={idx} src={img} width={32} height={32} className='review-img' alt={'review image' + idx} />)}
        </div>
        <input type='submit'></input>
      </form>
    </div>
  )
};

const RatingSelector = (props) => {
  var [checked, setChecked] = useState(props.default || 0);
  const onChange = (val) => {
    var value = Number(val);
    props.onChange(value);
    setChecked(value);
  }
  return (<span className='rating-selector'>
    <input type='radio' value='1' checked={checked === 1} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='2' checked={checked === 2} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='3' checked={checked === 3} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='4' checked={checked === 4} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='5' checked={checked === 5} onChange={e => onChange(e.target.value)}></input>
  </span>)
};

export default FormModal;