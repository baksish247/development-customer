import React, { useEffect } from 'react';
import './LandingLoaderText.css'; // Make sure to create and import the CSS file

const BouncingText = () => {
    useEffect(() => {
        const letters = document.querySelectorAll('.bounce12345');
        letters.forEach((letter, index) => {
            letter.classList.remove('hidden');
        });
    }, []);

    return (
        <div className="container12345">
            <span className="bounce12345">S</span>
            <span className="bounce12345">w</span>
            <span className="bounce12345">a</span>
            <span className="bounce12345">g</span>
            <span className="bounce12345">a</span>
            <span className="bounce12345">t</span>
            <span className="bounce12345">a</span>
            <span className="bounce12345">m</span>
            <span className="bounce12345">!</span>
        </div>
    );
};

export default BouncingText;
