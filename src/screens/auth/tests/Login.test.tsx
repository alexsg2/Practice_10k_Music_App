import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../Login';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('<Login />', () => {
  it('renders correctly', async () => {
    // Creates a snapshot located here: Practice_10k_Music_App/src/screens/auth/__snapshots__
    // This only checks HTML and CSS
    const tree = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows what the user typed into the email input', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    // Find the input by its placeholder
    const emailInput = getByPlaceholderText('Email');

    // Simulate a user typing "test@example.com" into the email input
    fireEvent.changeText(emailInput, 'test@example.com');

    // Assert that the input's value has been updated
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('shows what the user typed into the password input', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    // Find the input by its placeholder
    const passwordInput = getByPlaceholderText('Password');

    // Simulate a user typing "secretPassword" into the password input
    fireEvent.changeText(passwordInput, 'secretPassword');

    // Assert that the input's value has been updated
    expect(passwordInput.props.value).toBe('secretPassword');
  });
});
