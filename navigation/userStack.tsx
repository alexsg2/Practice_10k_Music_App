import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigation from '../src/Navigation';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <AppNavigation/>
  );
}