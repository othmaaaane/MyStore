import React, { useEffect, useState } from 'react';
import './CheckOut.css';
import { useSelector } from 'react-redux';

export default function Checkout() {
  const ListId = useSelector((data) => data);
  const [checkOutData, setCheckOutData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchToCheckOut = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setCheckOutData(data);

      const filteredData = data.filter((e) => ListId.includes(e.id));
      setDisplayData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchToCheckOut();
  }, [ListId]);

  useEffect(() => {
    // Calculate total price
    const total = displayData.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);
    setTotalPrice(total);
  }, [displayData]);

  const handleQuantityChange = (productId, quantity) => {
    setDisplayData(prevDisplayData =>
      prevDisplayData.map(product =>
        product.id === productId ? { ...product, quantity: parseInt(quantity) } : product
      )
    );
  };

  return (
    <div className="product">
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((product) => (
            <tr key={product.id}>
              <td className="product">
                <img src={product.images[0]} alt={product.title} />
                <span>{product.title}</span>
              </td>
              <td>${product.price}</td>
              <td className="quantity">
                <button>-</button>
                <input
                  type="number"
                  defaultValue={product.quantity || 1}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
                <button>+</button>
              </td>
              <td>${(product.price * (product.quantity || 1)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h3>Order Summary</h3>
        <p>Order Total: ${totalPrice.toFixed(2)}</p>
        <p>Sales Volume: {displayData.length}</p>
        <button>CHECKOUT</button>
      </div>
      <p className='test'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum nihil iure eum officiis commodi doloribus.</p>
    </div>
  );
}
