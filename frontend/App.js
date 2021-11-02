import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Main from './src/screen/Main';
import Root from './src/navigation/Root';


export default function App() {
  return (
    <NavigationContainer>
      <Root />
      {/* <Main/> */}
    </NavigationContainer>
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
