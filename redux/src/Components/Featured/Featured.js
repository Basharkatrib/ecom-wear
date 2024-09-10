import React, { useEffect, useState } from 'react';
import './Featured.css';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 

export default function Featured(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      AOS.init({
        duration: 500, 
        once: false,
      });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                const filterType = props.type === 'trending' ? 'trend' : 'feature';

                const response = await fetch(`${process.env.REACT_APP_API_URL}/products?populate=image&filters[${filterType}][$eq]=true&sort[0]=createdAt:desc&pagination[limit]=4`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [props.type]);

    return (
        <div className="flex flex-col justify-center items-center p-14 flex-wrap">
            <div className="feature_top flex justify-around items-center">
                <h1 className="text-2xl text-cyan-950 font-bold basis-1/4">{props.type} products</h1>
                <p className="basis-3/4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
                </p>
            </div>
            <div className="feature_image flex justify-between flex-wrap items-center mt-10 gap-x-8 transition duration-700 ease-in-out hover:scale-125" data-aos="fade-up">
                {products.map((product) => (
                    <img
                        key={product.id}
                        className="h-48 w-48 rounded-lg transition duration-700 ease-in-out hover:scale-125"
                        src={`${process.env.REACT_APP_API_APP}${product.attributes.image.data.attributes.url}`}
                        alt={product.attributes.title}
                    />
                ))}
            </div>
        </div>
    );
}
