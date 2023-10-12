import React, {useState} from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPassword from './src/screens/auth/ResetPassword'
import Login from './src/screens/auth/Login';
import ProfileSetup from './src/screens/auth/ProfileSetup';
import PopupMessage from './src/components/PopupMessage';
const Stack = createStackNavigator();
export default function App() {
  // return <RootNavigation />;
  // return <ResetPassword />

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ResetPassword">
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
