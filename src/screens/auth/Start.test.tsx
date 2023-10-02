import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Start from './Start';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<Start />', () => {
  it('renders correctly', () => {
    const tree = render(
      <NavigationContainer>
        <Start />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to Login when the Login button is pressed', () => {
    // Setup the mock
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByText } = render(
      <NavigationContainer>
        <Start />
      </NavigationContainer>
    );

    // Click login button
    fireEvent.press(getByText('Login'));

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to Register when the Register button is pressed', () => {
    // Setup the mock
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByText } = render(
      <NavigationContainer>
        <Start />
      </NavigationContainer>
    );

    // Click register button
    fireEvent.press(getByText('Register'));

    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
