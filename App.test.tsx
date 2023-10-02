import React from 'react';
import { render } from '@testing-library/react-native';
import { ReactTestRendererJSON } from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = render(<App />).toJSON() as ReactTestRendererJSON;
    expect(tree?.children?.length).toBe(1);
  });
});
