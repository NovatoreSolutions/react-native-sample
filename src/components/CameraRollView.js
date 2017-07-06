import React, { Component, PropTypes } from 'react'
import {
  CameraRoll,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';

class CameraRollView extends Component {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
 
  assets: [],
  images: [],
  lastCursor: null,
  noMorePhotos: false,
  loadingMore: false,
};

    this._storeImages = this._storeImages.bind(this)
    this._logImageError = this._logImageError.bind(this)
    this._selectImage = this._selectImage.bind(this)


    this.tryPhotoLoad =this.tryPhotoLoad.bind(this);
    this.loadPhotos = this.loadPhotos.bind(this);
    this.appendAssets = this.appendAssets.bind(this);
    this.endReached = this.endReached.bind(this)
  }

  componentDidMount() {
    // get photos from camera roll
    // CameraRoll.getPhotos(this.state.fetchParams).done(
    //   (data) =>{
    //  console.log(data);
    //   const assets = data.edges;
    // const images = assets.map( asset => asset.node.image );
    //   this.setState({
    //     images: images,
    // });

    // if (data.page_info.has_next_page) {
     
    //  console.log("images exist")
    //   }

    
    //  },
    //   (error) => {
    //   console.log(err);
    //  }
    // );
  

    this.tryPhotoLoad()

      

  }



  tryPhotoLoad() {
  if (!this.state.loadingMore) {
    this.setState({ loadingMore: true }, () => { this.loadPhotos(); });
  }
}

loadPhotos() {
  const fetchParams = {
    first: 35,
    groupTypes: 'SavedPhotos',
    assetType: 'Photos',
  };

  if (Platform.OS === 'android') {
  // not supported in android
    delete fetchParams.groupTypes;
  }

  if (this.state.lastCursor) {
    fetchParams.after = this.state.lastCursor;
  }

  CameraRoll.getPhotos(fetchParams).then((data) => {
    console.log(data)
    this.appendAssets(data);
  }).catch((e) => {
    console.log(e);
  });
}

appendAssets(data) {
  const assets = data.edges;
 
  const nextState = {
    loadingMore: false,
  };

  if (!data.page_info.has_next_page) {
    nextState.noMorePhotos = true;
  }

  if (assets.length > 0) {
    nextState.lastCursor = data.page_info.end_cursor;
    nextState.assets = this.state.assets.concat(assets);
    const images = assets.map( asset => asset.node.image );
    nextState.images = this.state.images.concat(images);
    
  }

  this.setState(nextState);
  
}





endReached = () => {
  console.log("end call")
  if (!this.state.noMorePhotos) {
    this.tryPhotoLoad();
  }
  };


  // callback which processes received images from camera roll and stores them in an array
  _storeImages(data) {
    const assets = data.edges;
    const images = assets.map( asset => asset.node.image );
    this.setState({
        images: images,
    });
  }

  _logImageError(err) {
      console.log(err);
  }

  _selectImage(uri) {
    // define whatever you want to happen when an image is selected here
    this.setState({
      selected: uri,
    });
    console.log('Selected image: ', uri);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={styles.container}>
            <View style={styles.imageGrid}>
            { this.state.images.map(image => {
              return (
               <TouchableHighlight  key={image.uri} onPress={() => this._selectImage(image.uri)}>
                 <Image style={styles.image} source={{ uri: image.uri }} />
               </TouchableHighlight>
             );
            })}
            </View>
             
        </ScrollView>
        
      <TouchableOpacity   onPress={() => this.endReached()}  style={ styles.button_container}>
        <Text style={ styles.button_text}>View more..</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  image: {
      width: 100,
      height: 100,
      margin: 10,
  },
  capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
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
});

export default CameraRollView