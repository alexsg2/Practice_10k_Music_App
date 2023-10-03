import React from 'react';
import './config/firebase';
import RootNavigation from './navigation';
import AuthNavigator from './src/screens/auth/AuthNavigator';
import AppNavigation from './src/Navigation';

export default function App() {
  return (
    <RootNavigation/>
  );
}
