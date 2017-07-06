import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem,Icon } from 'react-native-elements';

class EmployeeDetail extends Component {


onGallery = () => {
    this.props.navigation.navigate('CameraRollView');
  };
   
  
  render() {
    const { image, name, email, phone, birthdate, city } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: image}}
          featured
          title={`${name.toUpperCase()}`}
          caption={email}
          onPress={() => this.onGallery()}
         
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={phone}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Name"
            rightTitle={name}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Birthday"
            rightTitle={birthdate}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={city}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default EmployeeDetail;