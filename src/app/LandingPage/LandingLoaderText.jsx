import React, { useEffect } from 'react';
import './LandingLoaderText.css'; // Make sure to create and import the CSS file

const BouncingText = () => {
    useEffect(() => {
        const letters = document.querySelectorAll('.bounce');
        letters.forEach((letter, index) => {
            letter.classList.remove('hidden');
        });
    }, []);

    return (
        <div className="container">
            <span className="bounce">S</span>
            <span className="bounce">w</span>
            <span className="bounce">a</span>
            <span className="bounce">g</span>
            <span className="bounce">a</span>
            <span className="bounce">t</span>
            <span className="bounce">a</span>
            <span className="bounce">m</span>
            <span className="bounce">!</span>
        </div>
    );
};

export default BouncingText;
