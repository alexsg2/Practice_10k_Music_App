import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Register from './Register';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('<Register />', () => {
  it('renders correctly', async () => {
    const tree = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
