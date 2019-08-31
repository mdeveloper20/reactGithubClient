import React from 'react';
import {RepoScreen} from '../App/Screens/RepoScreen';

import renderer from 'react-test-renderer';

test('repo render test', () => {
    const tree = renderer.create(<RepoScreen selectedRepo={"facebook/react-native"} />);
    expect(tree).toMatchSnapshot();
});