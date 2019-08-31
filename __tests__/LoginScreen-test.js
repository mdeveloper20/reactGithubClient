import React from 'react';
import {LoginScreen} from '../App/Screens/LoginScreen';

import renderer from 'react-test-renderer';

test('home render test', () => {
    const tree = renderer.create(<LoginScreen />);
    expect(tree).toMatchSnapshot();
});