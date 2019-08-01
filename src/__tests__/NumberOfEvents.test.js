import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => { NumberOfEventsWrapper = shallow(<NumberOfEvents />); })

  test('render event number input', () => {
    expect(NumberOfEventsWrapper.find('input')).toHaveLength(1);
  });

  test('when no number was input, 32 is the default event number', () => {
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(32);
  });

  test('change state when number input changes', () => {
    const eventObject = { target: { value: 25 } };
    NumberOfEventsWrapper.find('input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(25);
  });
});
