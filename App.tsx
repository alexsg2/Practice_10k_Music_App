import React from 'react';
import { Provider } from 'react-redux';
import './config/firebase';
import RootNavigation from './navigation';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
