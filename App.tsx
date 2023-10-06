import React from 'react';
import { Provider } from 'react-redux';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );

}
