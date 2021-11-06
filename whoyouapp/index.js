import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native'

import App from './App';

messaging().getToken()
.then((res) => {
  console.log(res)
})

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log('opened')
  console.log(remoteMessage)
})

messaging().getInitialNotification((remoteMessage) => {
  console.log('opened2')
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
