import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from './components/Loading';

import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn';
import EnterpriseDetail from './pages/EnterpriseDetail';

import { useAuth } from './hooks/auth';

const App = createStackNavigator()

export default function Routes() {
  const { investor, loading } = useAuth()

  if(loading){
    return <Loading />
  }

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
