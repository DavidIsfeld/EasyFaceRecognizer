import React from 'react';
import BoundingBox from '../BoundingBox/BoundingBox';

const FaceRecognition = ( {imageUrl, boxes} ) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto"/>
                {boxes && boxes.map(box => (
                    <BoundingBox key={box.id} box={box} />
                ))}     
            </div>
        </div>
    );
};

export default FaceRecognition;