import React from "react";
import './FacialRecognition.css';

const FacialRecognition = ({imageUrl, box}) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt="face-detect" width="500px" height="auto" />
                <div className="bounding_box" style={{top: box.topRow,  right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FacialRecognition;