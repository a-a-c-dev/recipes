import { renderHook, act, WaitFor } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });



  test('should update storage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial value'));

    expect(result.current[0]).toEqual('initial value');
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value')
  });
});