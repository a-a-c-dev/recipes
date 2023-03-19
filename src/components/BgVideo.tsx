import React from 'react';
import videoSrc from '../assets/cookingBg.mp4';
import LazyLoad from 'react-lazy-load';


export const BgVideo = () =>{
    return (
        <>
            <LazyLoad  offsetVertical={300}>
                    <video className="video-bg" autoPlay loop muted poster="">
                        <source src={videoSrc} type=" video/mp4" />      
                    </video>
            </LazyLoad>
        </>
    )
}
