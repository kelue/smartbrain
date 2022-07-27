import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Particles from "react-tsparticles";
import { ParticlesConfig } from './assests/Particles';

const KEY = '4d6a22fc42294ca89a144005005b3b4a';
const USER_ID = process.env.REACT_APP_CLARIFAI_USER_ID;
const APP_ID = process.env.REACT_APP_CLARIFAI_APP_ID;

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation= (data) =>{

     //from the .outputs represents the path to the object value that we are interested in which is the bounding box that surrounds the face in the pictures
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    
    //converts the dimensionsof the pictures from pixels to regular numbers
    const width = Number(image.width); 
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox= (box) => {
    console.log(box)
    this.setState({box: box})
  }
  
  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    //constructs body of the message that is sent to the Clarify API
    const raw = {
      user_app_id: {
            user_id: "",
            app_id: ""
        },
      inputs: [
        {
          data: {
            image: {
              url: ""
            }
          }
        }
      ]
    };

    //Assigning enviromental variables for user and app id to the message body
    raw.user_app_id.user_id = USER_ID;
    raw.user_app_id.app_id = APP_ID;
  
    raw.inputs[0].data.image.url = this.state.input; //updates the JSON object with the state of the inbox input
    
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + KEY
      },
      body: JSON.stringify(raw)
    };



      this.setState({imageUrl: this.state.input})

      //the API call to Clarifai that does the predicting for the app
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result.outputs[0].data))
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result))) 
      .catch(error => console.log('error', error));
  }
  //regions[0].region_info.bounding_box

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true})
    }else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  
  

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className='App'>
        <Particles className='particles' id="tsparticles" options={ParticlesConfig}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FacialRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : ( route === 'signIn'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
          }
      </div>
    );
  }
}

export default App;
