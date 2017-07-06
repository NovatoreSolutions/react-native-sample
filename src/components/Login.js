import React , { Component } from 'react'
import {  Container,Toast } from 'native-base';
import {View,AlertIOS,Platform,Keyboard,StyleSheet,ActivityIndicator, ToastAndroid, AsyncStorage, Text,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import LoginForm from './LoginForm'
import renderIf from './renderIf';

const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';



export default class Login extends Component  {

  componentWillMount() {
    this.getToken();
  }
  constructor(){

    super();
    this.loginBtnClicked = this.loginBtnClicked.bind(this);
    

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
      disableBtn : false
    }

   
  }
  

   updateEmail = (text) => {
      this.setState({email: text})
      this.setState({error: ""})
     
   }
   updatePassword = (text) => {
      this.setState({password: text})
       this.setState({error: ""})
      
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

  storeUserInfo(responseData){
   
     let userData =JSON.stringify(responseData)
    AsyncStorage.setItem(USER_INFO, userData, (err)=> {
      if(err){
        console.log("an error",err);
        throw err;
      }
      console.log("success");
      
    }).catch((err)=> {
        console.log("error is: " + err);
    });
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


redirect(routeName, accessToken){
    Keyboard.dismiss()
     this.props.navigation.navigate(routeName);
  }




  

    async loginBtnClicked() {
       Keyboard.dismiss()
      if(this.state.email == ''){


if (Platform.OS === 'android') {
   ToastAndroid.show('Please Enter Email.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);  
  }
else{
AlertIOS.alert(
 'Required',
 'Please Enter Email.'
);
}

  
      }
      else if(this.state.password == ''){
        
         if (Platform.OS === 'android') {
  ToastAndroid.show('Please Enter Password.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }
else{
AlertIOS.alert(
 'Required',
 'Please Enter Password.'
);
}

      }
      else{

    console.log("i am called")
      console.log("emaill", this.state.email)
      console.log("password",this.state.password)
    this.setState({showProgress: true})
     this.setState({disableBtn: true})
    try {
      let response = await fetch('https://reactapi.herokuapp.com/api/sign-in', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                
                                  email: this.state.email,
                                  password: this.state.password,
                                
                              })
                            });
      let res = await response.json();
      console.log(res)
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res.data.token;
          let user = res.data.user

        
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          this.storeUserInfo(user);
          
           Toast.show({
              text: 'Login successfully',
              position: 'bottom',
              duration : 3000
            })
           this.redirect('Tabs');
      } else {
          //Handle error
          let error = res.message;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
         this.setState({disableBtn: false})
         Toast.show({
              text: error,
              position: 'bottom',
              duration : 1000
            })
        
        console.log("error " + error);
        this.setState({showProgress: false});
    }
      }
     
  
  }
  render() {
     
    return(

    <Container>
    <KeyboardAvoidingView behavior="padding"  style={styles.login_wrapper}>
        <View style={styles.logo_container}>
         <Image  style= {styles.logo} source={require('../images/logoTW.png')}></Image>
        <Text style={styles.title}>Now manage your contacts information here.</Text>
         {renderIf(this.state.showProgress, 
                    <ActivityIndicator
        animating={true} size="large" style={styles.loader}   color="white"
      /> 
                )}
       
        </View>
        <View style={ styles.form_container}>
                  <Text style={styles.error}>
          {this.state.error}
        </Text>
          <LoginForm disableBtn= {this.state.disableBtn} onLoginClick={this.loginBtnClicked} updateEmail = {this.updateEmail}
               updatePassword = {this.updatePassword} />
        </View>
    </KeyboardAvoidingView>
    </Container>


   
   
 );
    

  }


}



const styles = StyleSheet.create({
  login_wrapper: {
    flex: 1,
    backgroundColor: 'steelblue'
  },
  logo_container:{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow:1
  },
    logo: {
      width: 240,
      height:80
  },
  title:{
    color : '#fff',
    width: 200,
    textAlign :'center',
    marginTop: 10,
    opacity : 0.9

  },
   error: {
    color: 'red',
    paddingLeft : 20
  },
  loader: {
  
  }
});

  