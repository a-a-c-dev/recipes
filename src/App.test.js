import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

describe('Testing app component', () => {
    let wrapper;
    let OnChangeSearching = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<App onChange={OnChangeSearching} />);
    });


    it('Should render correctly ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    xit('simulate change handler', () => {
        //wrapper.find('input').instance().onChange({ target: { value } });
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        // expect(OnChangeSearching).toBeCalledWith('test');
        //expect(mockFn.mock.calls[0][0]).toBe('test');

    });
    afterEach(() => {
        wrapper.unmount();
    });

});


describe('', () => {
    let wrapper;
    let OnChangeSearching = jest.fn();
    const props = {
        onChange: OnChangeSearching
    }
    beforeEach(() => {
        wrapper = shallow(<App {...props} />);
    });

    it('Should test change handler', () => {
        let value = '';
        const mockCallback = OnChangeSearching.mock.calls.length;
        expect(mockCallback).toBe(0);
        expect(wrapper.find('input').at(0).prop('value')).toEqual('');
        wrapper.find('input').props().onChange({ target: { value: 'test' } });
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        wrapper.find('input').at(0).props().onChange({ e.target:{ e.value: 'test'}}})
    .onChange({ City: { target: { value: 'test' } } })
//expect(mockCallback).toBe(1);
expect(wrapper.find('input').at(0).prop('value')).toEqual('');

expect(wrapper.find('input').at(0).prop('value')).toEqual('test');
        //expect(wrapper.find({ prop: 'value' })).to.have.lengthOf(1)

        //expect(OnChangeSearching).toHaveBeenCalled();
        //expect(OnChangeSearching).toHaveBeenCalledWith("test");



    })

afterEach(() => {
    wrapper.unmount();
});
})