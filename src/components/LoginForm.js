import React , { Component } from 'react'
import {View,StyleSheet, Text,TextInput,TouchableOpacity,StatusBar} from 'react-native'

export default class LoginForm extends Component  {

  

  render() {
    
    return(
    <View style={styles.container}>
    
        <TextInput  onChangeText = {this.props.updateEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onSubmitEditing={ () => this.passwordInput.focus()} style={styles.input} placeholder="username or email" placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" returnKeyType="next"/>
        <TextInput onChangeText = {this.props.updatePassword} ref={(input)=> this.passwordInput = input} secureTextEntry  style={styles.input} placeholder="password"placeholderTextColor="rgba(255,255,255,0.6)" underlineColorAndroid="rgba(0,0,0,0.0)" returnKeyType="go"/>
        <TouchableOpacity disabled={this.props.disableBtn} onPress={() => {this.props.onLoginClick(this.props.email, this.props.password)}}  style={ styles.button_container}>
        <Text  style={ styles.button_text}>LOGIN</Text>
        </TouchableOpacity>
    </View>


   
   
 );
    

  }


}



const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
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
  }

});

  