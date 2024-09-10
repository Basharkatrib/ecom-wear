import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Contact from "../../Components/Contact/Contact";
import Featured from "../../Components/Featured/Featured";
import Gallery from "../../Components/Gallery/Gallery";
import Slider from "../../Components/Slider/Slider";

export default function Hoome() {
    const location = useLocation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.success) {
            setNotificationMessage(location.state.success);
            setShowNotification(true);

            const timer = setTimeout(() => {
                setShowNotification(false);
                setNotificationMessage(''); 
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <>
            {showNotification && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000,
                }}>
                    {notificationMessage}
                </div>
            )}
            <Slider />
            <Featured type="Featured" />
            <Gallery />
            <Featured type="trending" />
            <Contact />
        </>
    );
}
