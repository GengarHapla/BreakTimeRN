import React from 'react';
import { Button } from './Button';

import renderer from 'react-test-renderer';
import { View } from 'react-native';

test('renders correctly', () => {
    const tree = renderer.create(<Button onPress={() => {}}><View/></Button>).toJSON();
    expect(tree).toMatchSnapshot();
});
