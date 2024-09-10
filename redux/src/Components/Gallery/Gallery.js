import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../Store/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 

export default function Gallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500, 
      once: false,
    });
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  if (!categories || categories.length === 0) {
    return <div>No categories found.</div>;
  }

  const baseUrl = process.env.REACT_APP_API_APP || 'http://localhost:1337';
  const handleCategoryClick = (categoryTitle) => {
    navigate(`/products/${categoryTitle}`);
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-wrap justify-between">
        {categories.map((category) => {
          const imageUrl = category.attributes.image.data?.attributes?.url;
          const fullImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : '';
          return (
            <div
              key={category.id}
              className="flex flex-col w-full sm:w-1/2 md:w-1/3 p-2"
              data-aos="fade-right"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-lg transition duration-700 ease-in-out hover:scale-90">
                <div className="gall w-full h-full">
                  <img
                    alt="gallery"
                    className="block w-full h-full "
                    src={fullImageUrl}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white"
                    onClick={() => handleCategoryClick(category.attributes.title)}
                  >
                    {category.attributes.title}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
