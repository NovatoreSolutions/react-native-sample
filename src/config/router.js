
import React from 'react';

import { Spinner} from 'native-base';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../components/Login';
import Splash from '../components/Splash';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetail from '../components/EmployeeDetail';
import Register from '../components/Register';
import Profile from '../components/Profile';
import CreateContact from '../components/CreateContact';
import CaptureImage from '../components/CaptureImage';
import CameraRollView from '../components/CameraRollView';



export const LoginScreen = StackNavigator({
  Login: {
    screen: Login,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});



export const EmployeeStack = StackNavigator({
  EmployeeList: {
    screen: EmployeeList,
    navigationOptions: {
      title: 'Saved Contacts'
      
    },
  },
  Details: {
    screen: EmployeeDetail,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
    }),
  },
  CreateContact: {
    screen: CreateContact,
    navigationOptions:  ({navigation}) => ({ 
      
      
      title: 'Create Contacts',
       headerRight: <Spinner color='blue' animating={true} size="small"  style={{ paddingRight: 10}} />
      
      
     }),
  }
});

export const Tabs = TabNavigator({
  EmployeeList: {
    screen: EmployeeStack,
    navigationOptions: {
      
        tabBarlabel: 'Contacts',
       tabBarIcon: ({ tintColor }) => (<Icon name="list" size={35} color={tintColor} />) 
        
      
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
     
        tabBarlabel: 'Me',
        tabBarIcon: ({ tintColor }) => (<Icon name="account-circle" size={35} color={tintColor} />)
      
    },
  },
});




export const Root = StackNavigator({
  Splash: {
    screen: Splash,
  },
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: Register,
  },
  Tabs: {
    screen: Tabs,
  },
  CaptureImage: {
    screen: CaptureImage,
  },
  CameraRollView: {
    screen: CameraRollView,
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});



