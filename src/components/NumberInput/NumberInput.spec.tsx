import React from 'react';
import NumberInput from './NumberInput';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<NumberInput
            onChange={() => {}}
            placeholder={''}
            />).toJSON();
    expect(tree).toMatchSnapshot();
});
