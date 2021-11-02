import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const MainList = forwardRef((props, ref) => {

  const mainList = useRef(new Animated.Value(deviceHeight)).current

  useImperativeHandle(ref, () => ({
    open: () => {
      console.warn('mount')
      Animated.timing(mainList, {
        toValue: deviceHeight * 0.6,
        duration: 400,
      }).start()
    },
    close: () => {
      console.warn('unmount')
      Animated.timing(mainList, {
        toValue: deviceHeight,
        duration: 400,
      }).start()
    }
  }))
  
  return (
    <Animated.View
      style={{
        top: mainList}}
    >
      <View style={styles.mainList}>
      </View>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  mainList: {
    position: 'absolute',
    width: '100%',
    height: deviceHeight * 0.6,
    backgroundColor: 'skyblue',
    elevation: 11,
  }
})

export default MainList