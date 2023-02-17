import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import React, {Component} from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width);
    console.log(height);

    return {
      leftCol: width,
      topRow:  height,
      rightCol: -width,
      bottomRow: -height
    };
  };

  displayFaceBox = (box) => {
    this.setState({box: box});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.displayFaceBox(this.calculateFaceLocation(""));
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        <ParticlesBg type="color" bg={true} />
      </div>
    );
  }
}

export default App;
