import React from 'react';
import * as ReactAll from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { GameFooter, PlayAgainButton } from '../../../components/common/GameFooter';
import { HOME_PATH } from '../../../config/paths';

describe('<GameFooter />', () => {
  it('renders when isGameOver false and hasPlayerWon false', () => {
    const initialStatusContext = {
      isGameOver: false,
      setGameOver: () => {},
      hasPlayerWon: false,
      setPlayerWon: () => {},
    };
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameFooter />);
    const divs = component.find('div');
    expect(divs.length).toBe(1);
    expect(divs.at(0).prop('className')).toEqual('game-footer-container');
  });

  it('renders when isGameOver true and hasPlayerWon false', () => {
    const initialStatusContext = {
      isGameOver: true,
      setGameOver: () => {},
      hasPlayerWon: false,
      setPlayerWon: () => {},
    };
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameFooter />);
    const divs = component.find('div');
    expect(divs.length).toBe(2);
    expect(divs.at(0).prop('className')).toEqual('game-footer-container');
    expect(divs.at(1).text()).toEqual('You lost');

    const playAgainButton = component.find(PlayAgainButton);
    expect(playAgainButton.length).toBe(1);
  });

  it('renders when isGameOver false and hasPlayerWon true', () => {
    const initialStatusContext = {
      isGameOver: false,
      setGameOver: () => {},
      hasPlayerWon: true,
      setPlayerWon: () => {},
    };
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<GameFooter />);
    const divs = component.find('div');
    expect(divs.length).toBe(2);
    expect(divs.at(0).prop('className')).toEqual('game-footer-container');
    expect(divs.at(1).text()).toEqual('You Won');

    const playAgainButton = component.find(PlayAgainButton);
    expect(playAgainButton.length).toBe(1);
  });

  it('renders <PlayAgainButton />', () => {
    const component = shallow(<PlayAgainButton />);
    const link = component.find(Link);
    expect(link.length).toBe(1);
    expect(link.prop('to')).toEqual(HOME_PATH);
    expect(link.prop('children')).toEqual('Play again');
  });
});
