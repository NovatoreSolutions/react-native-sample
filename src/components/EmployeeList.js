import React , { Component } from 'react'
import {View,ToastAndroid,ActivityIndicator,StyleSheet, Text,ScrollView,AsyncStorage} from 'react-native'
import { List, ListItem ,SearchBar,Card} from 'react-native-elements';
import { users } from '../config/data';
import ActionButton from 'react-native-action-button';
import renderIf from './renderIf';
import Icon from 'react-native-vector-icons/Ionicons';
import {  Container,Toast } from 'native-base';

const ACCESS_TOKEN = 'access_token'

export default class EmployeeList extends Component  {



 
constructor(props){
    super(props);


    this.onLogout = this.onLogout.bind(this)
    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
      error :"",
      dataSource : []
    }
  }
  componentWillMount() {
    this.getToken();
    
  }

  componentDidMount() {
     
    
  }

  async getToken() {

   
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

      if(!accessToken) {
          this.redirect('Splash');
      } else {
       
          this.setState({accessToken: accessToken})
         this.getContactList();
      }
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('Login');
    }
  }
  async deleteToken() {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
        this.redirect('Splash');
    } catch(error) {
        console.log("Something went wrong");
    }
  }
 
  redirect(routeName, accessToken){
     this.props.navigation.navigate(routeName);
  }
 

  
  async getContactList() {
    
   
    this.setState({showProgress: true})
    
      Toast.show({
              text: 'Loading data...',
              position: 'bottom',
              duration : 3000
            })
    try {
      let response = await fetch('https://reactapi.herokuapp.com/api/get-contact', {
                              method: 'GET',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'token' : this.state.accessToken
                              }
                            });


     
      let res = await response.json();

      console.log("contact res", res)
      if (response.status >= 200 && response.status < 300) {
          //Handle success
        
          console.log(res.data);
          this.setState({showProgress: false});
          this.setState({dataSource: res.data});

        
      } else {
          //Handle error
          let error = res.message;
          throw error;
      }
    } catch(error) {
      //errors are in JSON form so we must parse them first.
    
     Toast.show({
              text: error,
              position: 'bottom',
              duration : 3000
            })
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
        
    }
  }

 onLearnMore = (user) => {
    this.props.navigation.navigate('Details', { ...user });
  };

   onLogout(){
    console.log("Log out called")
    this.setState({showProgress: true})
    this.deleteToken();

    Toast.show({
              text: 'Log out successfully',
              position: 'bottom',
              duration : 3000
            })
  
  }

  render() {
    return (
      <Container>
     <View style={{flex: 1}}>
       {/*<SearchBar inputStyle={{padding : 12}}
  
  
  placeholder='Search contact list...' />*/}
      <ScrollView>
        
        <List style={{padding : 0}}>
          {this.state.dataSource.map((user) => (
            <ListItem
              key={user._id}
              roundAvatar
              avatar={{ uri: user.thumbnail }}
              title={`${user.name.toUpperCase()}`}
              subtitle={user.email}
              onPress={() => this.onLearnMore(user)}
            />
          ))}
        </List>
      {renderIf(this.state.showProgress, 
                    <ActivityIndicator
        animating={true} size="large" style={styles.loader}   color="steelblue"
      /> 
                )}
       
      </ScrollView>
        <ActionButton  buttonColor="#03A9F4">
          <ActionButton.Item buttonColor='#9b59b6' title="New Contact" onPress={() => this.redirect("CreateContact")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Log out" onPress={this.onLogout.bind()}>
            <Icon name="md-log-out"  style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        </View>
        </Container>
    );
  }

}


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  fab_bottom_margin: {
    paddingBottom : 50
  },
   loader: {
     marginTop : 10
  }

});




  