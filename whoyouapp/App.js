import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Main from './src/screen/Main';
import Root from './src/navigation/Root';
import { Provider } from 'react-redux';
import Store from './src/store/store';

const store = Store()

export default function App() {
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