import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Start from './Start';

describe('<Start />', () => {
  it('renders correctly', async () => {
    const tree = render(
      <NavigationContainer>
        <Start />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
