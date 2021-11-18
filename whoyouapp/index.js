import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import messaging from '@react-native-firebase/messaging'

import App from './App'

messaging().getToken()
.then(() => {
  // console.log(res)
})

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage)
})

registerRootComponent(App)
