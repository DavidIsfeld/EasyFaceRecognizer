import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './icons8-brain-64.png';

const Logo = () => {
    return (
        <div className='ma4 mto'>
            <Tilt className='logo br2 shadow-2 h4 mw4'>
                <div>
                    <img className='h4 mw4' src={brain} alt="brain icon" />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;