import React from 'react';
import * as ReactAll from 'react';
import { shallow } from 'enzyme';
import { BoardCell, BoardCellProps} from '../../../components/common/BoardCell';
import { GameStatusContextType } from '../../../components/common/GameStatusContext';

describe('<BoardCell />', () => {
  let props: BoardCellProps;
  let initialStatusContext: GameStatusContextType;

  beforeEach(() => {
    props = {
      row: 0,
      column: 5,
      value: 0,
      revealed: false,
      handleCellClick: jest.fn(),
      redFlag: false,
      questionMark: false,
    };

    initialStatusContext = {
      isGameOver: false,
      setGameOver: jest.fn(),
      hasPlayerWon: false,
      setPlayerWon: jest.fn(),
    };
  });

  it('renders empty hidden cell', () => {
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<BoardCell {...props} />);
    const cell = component.find('td');
    expect(cell.prop('className')).toEqual('cell-hidden');
    expect(cell.text()).toEqual('');
  });

  it('renders revealed cell with value 5', () => {
    props.revealed = true;
    props.value = 5;

    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<BoardCell {...props} />);
    const cell = component.find('td');
    expect(cell.prop('className')).toEqual('');
    expect(cell.text()).toEqual('5');
  });

  it('renders cell with mine', () => {
    props.revealed = true;
    props.value = -1;

    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => initialStatusContext);

    const component = shallow(<BoardCell {...props} />);
    const cell = component.find('td');
    expect(cell.prop('className')).toEqual('');
    expect(cell.text()).toEqual('*');
  });
});
