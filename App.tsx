import React from 'react';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import RootNavigation from './src/navigation';

// TODO : redux info does not persist when exiting app
// (i.e. all fields are empty)
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}
