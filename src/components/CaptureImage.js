
import React, { Component } from 'react';
import { Container, Content, Button,Text,Form, Item, Input,Label} from 'native-base';
import { StyleSheet} from 'react-native';
import CameraExample from './CameraComponent';


class CaptureImage extends Component {
  

  
takePicture = () => {
      camera.capture()
      .then((data) => this.setState({imagePath: data.path}))
      .catch(err => console.error(err));
   }

constructor(){

    super();
    
      this.state ={
        imagePath: ''
      }
   
  }


  render() {
        return (
            

                <CameraExample
            imagePath = {this.state.imagePath}
            takePicture = {this.takePicture}
         />
        );
    }
}






export default CaptureImage;
