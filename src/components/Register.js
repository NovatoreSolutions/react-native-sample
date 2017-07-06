import React, { Component } from 'react';
import { AsyncStorage,ActivityIndicator,Keyboard,ToastAndroid,KeyboardAvoidingView,View ,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {  ListItem,Icon } from 'react-native-elements';
import renderIf from './renderIf';
import {  Container,Toast } from 'native-base';
const ACCESS_TOKEN = 'access_token';
class Register extends Component {
  
componentWillMount() {
    this.getToken();
  }
    constructor(){
    super();

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      password: "",
      errors: "",
      showProgress: false,
      disableBtn : false
    }
  }
  
  redirect(routeName, accessToken){
    Keyboard.dismiss()
     this.props.navigation.navigate(routeName);
  }

    async storeToken(accessToken) {
      console.log(accessToken)
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfull ");
    } catch(error) {
        console.log("Something went wrong");
    }
  }


async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token",accessToken);
      if(accessToken){
        this.redirect('Tabs');
      }
      
    } catch(error) {
        console.log("Something went wrong");
        
    }
  }
   storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
     
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }
  async onRegisterPressed() {
    
     Keyboard.dismiss()
    console.log("reg button pressed", this.state.firstName )
    this.setState({showProgress: true})
    this.setState({disableBtn: true})
    try {
      let response = await fetch('https://reactapi.herokuapp.com/api/sign-up', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                               
                                  name: {
                                    firstName : this.state.firstName,
                                    lastName : this.state.lastName
                                  } ,
                                  email: this.state.email,
                                  city: this.state.city,
                                  password: this.state.password,
                                  contact: this.state.phone,
                                  password_confirmation: this.state.password_confirmation,
                                
                              })
                            });
      let res = await response.json();

      console.log("register resp", res)
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res.data.token;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          ToastAndroid.show("Register successfully. Logging into system", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          this.redirect('Tabs');
      } else {
          //Handle error
          let error = res.message;
          throw error;
      }
    } catch(error) {
      //errors are in JSON form so we must parse them first.
    ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
     this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
        this.setState({disableBtn: false})
    }
  }
  
  render() {
    
    return (


       <Container>
       <KeyboardAvoidingView behavior="padding"  style={styles.login_wrapper}>
       <View style={styles.container}>
        <View style={styles.container_Reg}>
         <Text style={ styles.title}>Register your account </Text>

        </View>
    
        <View >
        

        <TextInput  onChangeText={ (text)=> this.setState({firstName: text})}  style={styles.input} placeholder="First Name" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" />
        <TextInput  onChangeText={ (text)=> this.setState({lastName: text})}  style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" />
        <TextInput  onChangeText={ (text)=> this.setState({phone: text})}  style={styles.input} placeholder="Phone" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" />
        <TextInput  onChangeText={ (text)=> this.setState({city: text})}  style={styles.input} placeholder="City" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" />
        <TextInput  onChangeText={ (text)=> this.setState({email: text})}  keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onSubmitEditing={ () => this.passwordInput.focus()} style={styles.input} placeholder="username or email" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" returnKeyType="next"/>
        <TextInput  onChangeText={ (text)=> this.setState({password: text})}  ref={(input)=> this.passwordInput = input} secureTextEntry  style={styles.input} placeholder="password"placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" returnKeyType="go"/>
        <TouchableOpacity  disabled={this.state.disableBtn} onPress={this.onRegisterPressed.bind(this)}  style={ styles.button_container}>
        <Text style={ styles.button_text}>REGISTER</Text>
        </TouchableOpacity>
        {renderIf(this.state.showProgress, 
                    <ActivityIndicator
        animating={true} size="large" style={styles.loader}   color="white"
      /> 
                )}
      </View>
        
      </View>
      </KeyboardAvoidingView>
     </Container>
    );
  }
}

export default Register;

const styles = StyleSheet.create({


login_wrapper: {
    flex: 1,
    backgroundColor: 'steelblue'
  },
    container: {
    
    padding: 20,
    flexGrow:1
  
  },
  container_Reg: {
   
   alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    fontSize: 25,
    marginBottom: 15,
    color : '#ffffff'
  },
  input :{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom :10,
    color: '#fff',
    paddingHorizontal :10
  },
  button_container:{
    backgroundColor: '#03A9F4',
    paddingVertical : 15

  },
  button_text : {
     color: '#ffffff',
     textAlign : 'center',
     fontWeight : '700'
  },
  loader: {
    marginTop : 10
  }


})