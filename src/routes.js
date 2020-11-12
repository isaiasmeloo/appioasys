import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn';

import { useAuth } from './hooks/auth';
import EnterpriseDetail from './pages/EnterpriseDetail';

const App = createStackNavigator()

export default function Routes() {
  const { investor } = useAuth()

  console.log('INVESTOR ', investor);

  function AppScreen() {
    return (
      <>
        <App.Screen name="Home" component={Home} />
        <App.Screen
          options={{
            headerShown: true,
            title: "",
            headerBackTitleVisible: false,
            headerTintColor:'#C61B63',
          }}

          name="EnterpriseDetail"
          component={EnterpriseDetail}
        />
      </>
    )
  }

  return (
    <NavigationContainer>
      <App.Navigator
        screenOptions={{ headerShown: false }}
      >
        {investor
          ? AppScreen()
          : <App.Screen name="SignIn" component={SignIn} />
        }
      </App.Navigator>
    </NavigationContainer>
  )
}
