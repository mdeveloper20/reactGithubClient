import React from 'react';
import {SplashScreen} from '../App/Screens/SplashScreen';

import renderer from 'react-test-renderer';

test('splash render test', () => {
    const tree = renderer.create(<SplashScreen />);
    expect(tree).toMatchSnapshot();
});