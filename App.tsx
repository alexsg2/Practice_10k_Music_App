import React from 'react';
import './config/firebase';
import RootNavigation from './navigation';
import AuthNavigator from './src/screens/auth/AuthNavigator';

export default function App()
{
  return (
    <RootNavigation/>
  );
}
