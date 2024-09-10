import React, { useEffect } from 'react';
import './Stories.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Stories() {
    useEffect(() => {
        AOS.init({
            duration: 1500,
        });
    }, []);

    const stories = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.",
            image: "http://localhost:1337/uploads/team_member_01_e6c4b17c85.jpg",
            isImageLeft: false,
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.",
            image: "https://th.bing.com/th/id/R.0b5bbc9aa33d050efd6bbd168b7d13f5?rik=uIgadzS%2bUpZZIQ&pid=ImgRaw&r=0",
            isImageLeft: true,
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.",
            image: "http://localhost:1337/uploads/single_product_02_ddeb0e492e.jpg",
            isImageLeft: false,
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.",
            image: "https://th.bing.com/th/id/R.31e1fe062eb810a39624a01f1302c808?rik=rhhrL4c3ESRarg&pid=ImgRaw&r=0",
            isImageLeft: true,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-blue-700" data-aos="fade-down">
                Welcome to Our Stories
            </h1>

            {stories.map((story, index) => (
                <div
                    key={index}
                    className={`flex story-item w-full p-6 items-center gap-x-5 ${story.isImageLeft ? 'image-left' : 'image-right'}`} // استخدام image-left أو image-right
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                    <img
                        className="story-image rounded-lg shadow-md"
                        src={story.image}
                        alt={`Story Image ${index + 1}`}
                        data-aos="zoom-in"
                    />
                    <p className="story-text text-lg text-gray-800 leading-relaxed font-medium basis-1/2">
                        {story.text}
                    </p>
                </div>
            ))}
        </div>
    );
}
