import React from 'react';
import { View, Dimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const ImageContent = ({}) => {
  return (
    <Swiper
      controlsEnabled={false}
      containerStyle={{ width: '100%', height: deviceHeight }}
    >
      <View style={{backgroundColor: 'green', flex: 1}}></View>
      <View style={{backgroundColor: 'tomato', flex: 1}}></View>
      <View style={{backgroundColor: 'green', flex: 1}}></View>
      <View style={{backgroundColor: 'tomato', flex: 1}}></View>
    </Swiper>
  )
}

export default ImageContent;