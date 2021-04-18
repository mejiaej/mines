import React from 'react';
import { shallow } from 'enzyme';
import { GameSettings } from '../../../components/screens/game-settings/GameSettings';

describe('<GameSettings />', () => {
  it('renders form', () => {
    const component = shallow(<GameSettings />);
    const form = component.find('form');
    expect(form.length).toBe(1);

    const inputs = form.find('input');
    expect(inputs.length).toBe(3);
    expect(inputs.at(0).prop('name')).toEqual('rows');
    expect(inputs.at(1).prop('name')).toEqual('columns');
    expect(inputs.at(2).prop('name')).toEqual('mines');

    const button = form.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('type')).toBe('submit');
    expect(button.text()).toBe('START');
  });
});
