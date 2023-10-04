import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import AppNavigation from '../screens/tabs/appNavigation';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <AppNavigation/>
  );
}