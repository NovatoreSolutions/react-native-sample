
import React, { Component } from 'react';
import { Container, Content,Text,Form, Item, Input,Label,Spinner} from 'native-base';

import { Card, ListItem, Button } from 'react-native-elements'
import { StyleSheet} from 'react-native';
import { navigationOptions } from 'react-navigation';


class CreateContact extends Component {
  

   
   
// static navigationOptions = ({ navigation }) => {
 



//   let showProgress = navigation.state.params
//    console.log("Al show progress");
//    console.log(showProgress? showProgress.showProgress : false);
   
//   return {
    
//     title: 'Create Contacts',
//     headerRight: <Spinner color='blue' animating={true} size="small"  style={{ paddingRight: 10}} />
      
      
//   };
// };

 componentWillMount() {
    

    //  this.props.navigation.setParams({ showProgress  : false});
  }

constructor(){

    

    super();
    
     

 
     
   
  }




  render() {
      
        return (
            
            <Container >
                 
                    <Content>
                        
                        <Card
 
  image={{uri: 'https://placehold.it/400x400'}}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={{name: 'code'}}
    backgroundColor='#03A9F4'
    fontFamily='Lato'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>
                         
                    </Content>
                </Container>

               
        );
    }
}






export default CreateContact;
