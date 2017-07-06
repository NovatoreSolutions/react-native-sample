
import React , { Component } from 'react'
import {
  
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,Image
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Splash extends Component {

  componentWillMount() {
    this.getToken();
  }
 redirect(routeName, accessToken){
     this.props.navigation.navigate(routeName);
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          console.log("Token not set");
      } else {
          this.props.navigation.navigate('Tabs');
      }
    } catch(error) {
        console.log("Something went wrong");
    }
  } 
  
  
  render() {
    return (

      <View style={styles.container}>
         <Image  style={styles.bg_img} source={require('../images/blue-geometric-shapes-background_1053-276.jpg')}>
        <Text style={styles.title}>Welcome To CMS </Text>
        <TouchableHighlight onPress={ this.redirect.bind(this,'Register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={ this.redirect.bind(this, 'Login') } style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#F5FCFF',
    
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff'
    
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  },
    bg_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   resizeMode: 'cover',
    padding: 10,
     width: null,
    height: null,
    
  },
});


export default Splash