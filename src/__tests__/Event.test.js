import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import EventDetails from '../EventDetails';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => { EventWrapper = shallow(<Event />); });

    test('render event time and date', () => {
        expect(EventWrapper.find('.eventDate')).toHaveLength(1);
    });
    test('render event name', () => {
        expect(EventWrapper.find('.eventName')).toHaveLength(1);
    });
    test('render group name', () => {
        expect(EventWrapper.find('.groupName')).toHaveLength(1);
    });
    test('render people going', () => {
        expect(EventWrapper.find('.yesRSVP')).toHaveLength(1);
    });
    test('render button that displays event details', () => {
        expect(EventWrapper.find('.details')).toHaveLength(1);
    });
    test('render event details', () => {
        expect(EventWrapper.find(EventDetails)).toHaveLength(1);
    });
    test('click on details button should expand event details', () => {
        expect(EventWrapper.state('showDetails')).toEqual(false);
        EventWrapper.find('.details').simulate('click');
        expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(true);
    });
    test('click on details button should collapse event details', () => {
        expect(EventWrapper.state('showDetails')).toEqual(true);
        EventWrapper.find('.details').simulate('click');
        expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(false);
    });
});
