import React, { useEffect, useState } from 'react'
import { View, Animated, Image, LogBox } from 'react-native'
import images from '../../assets/images'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import CompassHeading from 'react-native-compass-heading'
import { connect } from 'react-redux'
const Direction = ({radarWidth, deviceHeight, deviceWidth}) => {
  LogBox.ignoreAllLogs()
  // const [directionInterval, setDirectionInterval] = useState(null)
  // const [direction, setDirection] = useState(null)

  // useEffect(() => {
  //   clearInterval(directionInterval)
  //   setDirectionInterval(setInterval(() => {
  //     getDirection()
  //   }, 3000)
  //   )
  // }, [direction])


  // const getDirection = async () => {
  //   const heading = await Location.getHeadingAsync()
  //   setDirection(heading.trueHeading)
  //   console.log(heading)
  // }
    // if (!direction || direction == -1) {
  //   return (
  //     <></>
  //   )
  // }
  // else {
  //   return (
  //     <>
  //     <View style={{transform: [{ rotate: `${direction}`+'deg' }]}}>
  //       <Image 
  //       source={images.cursor}
  //       style={{width:30, height:30}}
  //       ></Image>
  //     </View>
  //     </>
  //   )
  // }

  const [compassHeading, setCompassHeading] = useState(0)

  useEffect(() => {
    const degree_update_rate = 5

    CompassHeading.start(degree_update_rate, degree => {
      setCompassHeading(degree)
    })
    return () => {
      CompassHeading.stop()
    }
  }, [])

  return (
    // <></>
    <View
    style={{
      width: radarWidth + 40,
      height: radarWidth + 40,
      alignItems: 'center',
      transform: [{rotate: `${360 - compassHeading.heading}deg`}]
    }}
    >
      <SimpleLineIcons name="arrow-up" size={30} color="white" style={{position:'absolute',top:0, opacity:0.7}}/>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
  }
}

export default connect(mapStateToProps)(Direction)