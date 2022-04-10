import React from "react";

const FacialRecognition = ({imageUrl}) => {
    return(
        <div className="center">
            <img src={imageUrl} 
            // alt="face-detect"
            />
        </div>
    )
}

export default FacialRecognition;