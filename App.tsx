import React from 'react';
import { Provider } from 'react-redux';


import store from './src/redux/store';
import RootNavigation from './src/screens/navigation';


export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}
