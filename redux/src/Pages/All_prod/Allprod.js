import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';

export default function AllProducts() {
  const { categoryTitle } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const query = qs.stringify({
          filters: {
            categories: {
              title: {
                $eq: categoryTitle,
              },
            },
          },
          populate: '*',
        });
        const response = await fetch(`${process.env.REACT_APP_API_URL}/sub-categories?${query}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch sub-categories: ${response.status} ${await response.text()}`);
        }
        const data = await response.json();
        setSubCategories(data.data);
        if (data.data.length > 0) {
          setSelectedSubCategory(data.data[0].id);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSubCategories();
  }, [categoryTitle]);

  useEffect(() => {
    if (!selectedSubCategory) return;
    const fetchProducts = async () => {
      try {
        const query = qs.stringify({
          filters: {
            sub_category: {
              id: {
                $eq: selectedSubCategory,
              },
            },
            categories: {
              title: {
                $eq: categoryTitle,
              },
            },
          },
          populate: '*',
        });
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?${query}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${await response.text()}`);
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, [selectedSubCategory, categoryTitle]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8 mb-5">
      <h2 className="text-3xl font-bold text-cyan-950">SubCategories for {categoryTitle}</h2>
      <ul className="flex gap-x-5 mt-3">
        {subCategories.map((subCategory) => (
          <li
            className={`text-2xl cursor-pointer transition duration-700 ease-in-out ${selectedSubCategory === subCategory.id ? 'text-blue-500 border-b-4 border-indigo-500' : 'text-black'}`}
            key={subCategory.id}
            onClick={() => setSelectedSubCategory(subCategory.id)}
          >
            {subCategory.attributes.title}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-5 w-full basis-1/4 pl-5 pr-5 mt-5 justify-center items-center">
        {products.map((product) => {
          const imageUrl = product.attributes.image?.data?.attributes?.url;
          return (
            <div
              className="border border-gray-300 p-4 rounded-lg flex flex-col "
              key={product.id}
              
            >
              {imageUrl ? (
                <img
                  src={`${process.env.REACT_APP_API_APP}${imageUrl}`}
                  alt={product.attributes.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <h3 className="mt-2 font-bold text-xl">{product.attributes.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="bg-lime-500 p-1">Price: ${product.attributes.num}</p>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:outline-none active:bg-primary-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                  }}
                >
                  Add to cart
                </button>
              </div>
              <button
                type="button"
                className="inline-block rounded bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 transition duration-150 ease-in-out"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
