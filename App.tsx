import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';

import ProfileSetup from './src/screens/auth/ProfileSetup';

export default function App() {
  // return <RootNavigation />;
  return <ProfileSetup />
}
