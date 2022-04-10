import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div className="ma4 mt0">
            {/* Tilt tag enabled with an npm react tilt package */}
            <Tilt className="Tilt br2 shadow-2" options={{ max: 45, reset: true, }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop: '0.5rem'}} src={brain} alt="Brain logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo; 