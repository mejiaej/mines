import React from 'react';
import * as ReactAll from 'react';
import { shallow } from 'enzyme';
import { GameHeader, GameHeaderProps } from '../../../components/common/GameHeader';
import { CountDown } from '../../../components/common/CountDown';
import { GameStatusContextType } from '../../../components/common/GameStatusContext';

describe('<GameHeader />', () => {
  let props: GameHeaderProps;
  let initialStatusContext: GameStatusContextType;

  beforeEach(() => {
    props = {
      remainingTime: 20,
      redFlag: false,
      questionMark: false,
      handleRedFlagClick: jest.fn(),
      handleQuestionMarkClick: jest.fn(),
      mines: 5,
    };

    initialStatusContext = {
      isGameOver: false,
      setGameOver: jest.fn(),
      hasPlayerWon: false,
      setPlayerWon: jest.fn(),
    };
  });

  it('renders successfully', () => {
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameHeader {...props} />);
    const divs = component.find('div');
    expect(divs.length).toBe(3);
    expect(divs.at(0).prop('className')).toEqual('game-header-container');
    expect(divs.at(1).prop('className')).toEqual('header-countdown');
    expect(divs.at(2).prop('className')).toEqual('header-actions');

    const countDown = component.find(CountDown);
    expect(countDown.length).toBe(1);
    expect(countDown.prop('remaininTime')).toBe(props.remainingTime);

    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).prop('className')?.trim()).toEqual('header-actions-button');
    expect(buttons.at(1).prop('className')?.trim()).toEqual('header-actions-button');

    expect(buttons.at(0).prop('type')).toEqual('button');
    expect(buttons.at(1).prop('type')).toEqual('button');

    expect(buttons.at(1).prop('children')).toEqual('?');
  });

  it('renders renders redFlag true', () => {
    props.redFlag = true;
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameHeader {...props} />);
    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).prop('className')?.trim()).toEqual('header-actions-button selected-button');
    expect(buttons.at(1).prop('className')?.trim()).toEqual('header-actions-button');
  });

  it('renders renders questionMark true', () => {
    props.questionMark = true;
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameHeader {...props} />);
    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).prop('className')?.trim()).toEqual('header-actions-button');
    expect(buttons.at(1).prop('className')?.trim()).toEqual('header-actions-button selected-button');
  });
});
