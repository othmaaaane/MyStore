import React, { useEffect, useState } from 'react';
import '../products/products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AddAction } from './Redux/Actions';
import { useDispatch } from 'react-redux';

export function Products() {
  const [data, setData] = useState([]);
  const [filtreData, setFilterData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToCartMap, setAddedToCartMap] = useState({});
  const dispatch =useDispatch()
   

  const SearchFnct = () => {
    setFilterData(
      data.filter((e) => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const fetching = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const fetchedData = await response.json();
      setData(fetchedData);
      setFilterData(fetchedData);
      setAddedToCartMap(Object.fromEntries(fetchedData.map((product) => [product.id, false])));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const isValidImage = (url) => {
    const image = new Image();
    image.src = url;
    return image.complete && image.width > 0 && image.height > 0;
  };

  const renderProductImage = (images) => {
    const imageUrl = images && images.length > 0 ? images[0] : null;

    if (imageUrl && isValidImage(imageUrl)) {
      return <img className='product-img' src={imageUrl} alt="no pic" />;
    } else {
      return <img className='product-img' src='https://i.imgur.com/QkIa5tT.jpeg' alt="no pic" />;
    }
  };

  const handleAddToCart = (productId) => {
    
    dispatch(AddAction(productId));

    setAddedToCartMap((prevMap) => ({
      ...prevMap,
      [productId]: !prevMap[productId],
    }));
  };

  const allCateg = () => {
    fetching();
  }

  const clothesCateg = () => {
    setFilterData(data.filter(e => e.category && e.category.name === 'Clothes'  || e.category.name === 'Ropa' || e.category.name === 'John'  ));
  }

  const furnitureCateg = () => {
    setFilterData(data.filter(e => e.category && e.category.name === 'Furniture' || e.category.name === 'Muebles' || e.category.name === 'Chinchulin' ));
  }

  const electroCateg = () => {
    setFilterData(data.filter(e => e.category && e.category.name === 'Electronics' || e.category.name === 'Electronicos' ));
  }

  const shoesCateg = () => {
    setFilterData(data.filter(e => e.category && e.category.name === 'Shoes' || e.category.name === 'Zapatos' ));
  }

  const miscCatego = () => {
    setFilterData(data.filter(e => e.category && e.category.name === 'Miscellaneous' || e.category.name === 'Miscelaneos' ));
  }

  return (
    <section>
      
      <div className='input-container'>
        <input
          type="text"
          placeholder='Search for products..'
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span>
          <button className='search-btn' type='button' onClick={SearchFnct}>
            Search
          </button>
        </span>
      </div>
      <article className='big-article'>
        <article className='products-container'>
          {filtreData.map((e, key) => (
            <div className='product-card' key={key}>
              <center>{renderProductImage(e.images)}</center>
              <div>
                <h4 className='product-name'>{e.title}</h4>
              </div>
              <div className='quick-description-container'>
                <p className='quick-description'>{e.description} </p>
                <span>
                  <Link to={`/MoreDetails/${e.id}`}>
                    <button type='button' className='more-detailsBtn'>
                    {e.id} More details..
                    </button>
                  </Link>
                </span>
              </div>
              <br />
              <div className="category">{e.category.name}</div>
              <div className='addToCart-btn-price'>
                <p>price : {e.price} $</p>
                <button
                    type="button"
                    onClick={() => handleAddToCart(e.id)}
                    style={{
                      backgroundColor: addedToCartMap[e.id] ? 'green' : '#0e4e62',
                    }}
                     >
                    {addedToCartMap[e.id] ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </article>
        <article className='categories-container'>
          <div className='categories'>
            <center>
              <h4>Categories</h4>
            </center>
            <p onClick={allCateg}>All</p>
            <p onClick={clothesCateg}>Clothes</p>
            <p onClick={furnitureCateg}>Furniture</p>
            <p onClick={electroCateg}>Electronics</p>
            <p onClick={shoesCateg}>Shoes</p>
            <p onClick={miscCatego}>Miscellaneous</p>
          </div>
        </article>
      </article>
    </section>
  );
}



