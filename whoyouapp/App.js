import React from 'react';
import { useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
// import Main from './src/screen/Main';
import Root from './src/navigation/Root';
import { Provider } from 'react-redux';
import Store from './src/store/store';


const store = Store()

export default function App() {
  useEffect(() => {    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
        {/* <Main/> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});