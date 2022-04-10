import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            {/* p tag can take text directly but we are using this method to pratice embedding js into jsx and getting used to the syntax */}
            <p className="f3 white">{'This magic brain will detect the faces in your pictures. Give it a Try!'}</p>
            <div className="center"> {/*in the tutorial the tutor added this div, I did not know the reason but when I tested it in mobile view the page broke and adding this div fixed it so I guess that's what this div does!! */}
                <div className="center pa4 br3 shadow-5 form">
                    <input className="f4 pa2 w-70 center " type='text'onChange={onInputChange}/>
                    <button className="f4 w-30 grow link pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;