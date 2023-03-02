import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('should initialize value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('initial value'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'test value'));

    expect(result.current[0]).toEqual('test value');
  });

  test('should update storage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial value'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value')
  });
});