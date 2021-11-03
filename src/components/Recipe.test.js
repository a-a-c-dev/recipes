import React from 'react';
import { shallow } from 'enzyme';
import Recipe from './Recipe';
import style from '../recipe.module.css';

describe('MyComponent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Recipe />);
    });

    afterEach(() => {
        wrapper.unmount();
    });
    it('Should render correctly ', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('Check the elements on the page', () => {
        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('div').hasClass(style.recipe)).toEqual(true);
        expect(wrapper.find('h5').length).toBe(1);
        expect(wrapper.find('p').length).toBe(1);
        expect(wrapper.find('ol').length).toBe(1);
        expect(wrapper.find('li').length).toBe(0);
        expect(wrapper.find('img').length).toBe(1);
        expect(wrapper.find('img').hasClass(style.image)).toEqual(true);
    })
});
