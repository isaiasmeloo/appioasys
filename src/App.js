import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#C61B63" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
