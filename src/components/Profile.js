
import React, { Component } from 'react';
import { ScrollView ,Text,AsyncStorage,ToastAndroid} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';
import renderIf from './renderIf';

const USER_INFO = 'user_info';
class Profile extends Component {
  

   componentWillMount() {
  

     
      this.getProfile()
     
  
    
  }
  
onCam = () => {
    this.props.navigation.navigate('CaptureImage');
  };


constructor(){

    super();
    
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      

      dataLoaded :false,
      user : {
        
        email : '',
        contact :'',
        gender : ''

      },

      name : {
     
       firstName : '',
       LastName : ''

      },

      address : {
        city : ''
      }
    }
   
  }

 async getProfile() {
     
     
    try {
      let userInfo = await AsyncStorage.getItem(USER_INFO);
    
      let user = JSON.parse(userInfo);
         
         this.setState({user: user})
         this.setState({name: user.name})
          this.setState({address: user.address})
          this.setState({dataLoaded: true})
        console.log("user in state",this.state.user);
      
    } catch(error) {
        console.log("Something went wrong");
        
    }
  }

  render() {
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: "http://lorempixel.com/200/200/people/"}}
          featured
          title={`${this.state.name.firstName.toUpperCase()} ${this.state.name.LastName.toUpperCase()}`}
          caption={this.state.user.email}
           onPress={() => this.onCam()}
        />



       {renderIf(this.state.dataLoaded, 
                     <List>
          <ListItem
            title="Email"
            rightTitle={this.state.user.email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={this.state.user.contact}
            hideChevron
          />
        </List>
                )}            
       
      {renderIf(this.state.dataLoaded, 
                    <List>
          <ListItem
            title="Gender"
            rightTitle={this.state.user.gender}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={this.state.address.city}
            hideChevron
          />
        </List>  
                )}        
      
       

        
        

       
      </ScrollView>
    );
  }
}



export default Profile;
