import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  const fetchingDetails = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const fetchedData = await response.json();
      setDetails(fetchedData);
    } catch (error) {
      console.error('Error fetching Details Products:', error);
    }
  };

  useEffect(() => {
    fetchingDetails();
  }, []);

  const handleThumbnailClick = (index) => {
    // Set the main image to the clicked thumbnail
    setDetails((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails.mainImageIndex = index;
      return newDetails;
    });
  };

  return (
    <center>
      <article className='product-Details-container'>
        <Link to="/">
          <button type='button' className='back-btn'>
           <strong><span className='back-icon'>{'<'}</span></strong> Back
          </button>
        </Link>
        <div className='three-images-container'>
          {details.images &&
            details.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
        <div className='main-image-product'>
          <img
            className='main-image'
            src={details.images && details.images[details.mainImageIndex || 0]}
            alt='Main Product Image'
          />
        </div>
        <div className='product-description'>
          <center>
            <h3>{details.title}</h3>
          </center>{' '}
          <br />
          <div className='category'>{details.category && details.category.name}</div>
          <br />
          <p>{details.description}</p>
        </div>
        <div className='product-price'>Price: {details.price}$</div>
        <div className='add-to-cart'>
          <button type='button'>Add to Cart</button>
        </div>
      </article>
    </center>
  );
}

export default ProductDetails;
