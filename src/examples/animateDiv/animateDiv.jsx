import React from 'react';

import './animateDiv.css';



const getAnimateDivCallback = (distance, time, box) => {
    let startTime = null;

    const callback = (currentTime) => {
        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / time, 1);

        box.style.transform = `translateX(${progress * distance}px)`;

        if (progress < 1) {
            requestAnimationFrame(callback);
        }
    };

    return callback;
};


export const AnimateDiv = () => {


    const onClickhandler = (e) => {
        const box = e.currentTarget;
        const animateHandler = getAnimateDivCallback(500, 3000, box);
        requestAnimationFrame(animateHandler);
    };
    
    return (
        <div className='container'>
            <div className='box' onClick={onClickhandler} >

            </div>
        </div>
    )
}