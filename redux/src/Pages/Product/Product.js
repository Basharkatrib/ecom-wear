import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Ripple, initTWE } from "tw-elements";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';
import './Product.css';

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    initTWE({ Ripple });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}?populate=*`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${await response.text()}`);
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }
  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const { title, num, desc, image, image2, image3 } = product.attributes;
  const mainImageUrl = image?.data?.attributes?.url;
  const mainImageUrl2 = image2?.data?.attributes?.url;
  const mainImageUrl3 = image3?.data?.attributes?.url;

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };
  const handleDecrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 1));
  };

  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity: count };
    dispatch(addToCart(productToAdd));
  };

  const hasSmallImages = mainImageUrl2 || mainImageUrl3; 

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-10 mb-10 px-5">
      {/* Images Section */}
      <div className={`flex ${hasSmallImages ? 'flex-col md:flex-row' : ''} basis-full md:basis-2/3 gap-4`}>
        {hasSmallImages && (
          <div className="flex md:flex-col gap-2 w-full md:basis-1/4">
            {mainImageUrl2 && (
              <img className="h-40 md:h-48 w-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src={`${process.env.REACT_APP_API_APP}${mainImageUrl2}`} alt={title} />
            )}
            {mainImageUrl3 && (
              <img className="h-40 md:h-48 w-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src={`${process.env.REACT_APP_API_APP}${mainImageUrl3}`} alt={title} />
            )}
          </div>
        )}
        <div className={`w-full ${hasSmallImages ? 'md:basis-3/4' : ''}`}>
          {mainImageUrl ? (
            <img  className="main h-80 md:h-96 w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src={`${process.env.REACT_APP_API_APP}${mainImageUrl}`} alt={title} />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-y-5 bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 justify-center items-center">
        <h1 className="font-bold text-2xl md:text-4xl text-cyan-900">{title}</h1>
        <p className="text-gray-700">{desc}</p>
        <p className="text-xl md:text-2xl text-green-600 font-semibold">{num}$</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center mt-4">
          <button onClick={handleDecrement} className="p-2 w-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
            -
          </button>
          <span className="mx-4 text-lg font-bold">{count}</span>
          <button onClick={handleIncrement} className="p-2 w-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            +
          </button>
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-5 w-full">
          <button
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="w-full inline-block rounded bg-blue-600 px-6 py-3 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        
      </div>
    </div>
  );
}
