// observable.test.js
import useObservable from './src/observable.js';

describe('Observable', () => {
  let obj;
  let observable;

  beforeEach(() => {
    obj = { name: 'John', age: 30, address: { city: 'New York' } };
    observable = useObservable(obj);
  });

  test('should subscribe to changes', () => {
    const mockCallback = jest.fn();
    observable.subscribe(mockCallback);

    observable.set('age', 31);
    expect(mockCallback).toHaveBeenCalledWith('age', 31);

    observable.set('address.city', 'San Francisco');
    expect(mockCallback).toHaveBeenCalledWith('address.city', 'San Francisco');
  });

  test('should unsubscribe from changes', () => {
    const mockCallback = jest.fn();
    const unsubscribe = observable.subscribe(mockCallback);

    observable.set('age', 31);
    expect(mockCallback).toHaveBeenCalledWith('age', 31);

    unsubscribe();
    observable.set('name', 'Jane');
    expect(mockCallback).not.toHaveBeenCalledWith('name', 'Jane');
  });

  test('should get property value', () => {
    expect(observable.get('name')).toBe('John');
    expect(observable.get('address.city')).toBe('New York');
    expect(observable.get(['address', 'city'])).toBe('New York');
  });

  test('should handle non-existent properties', () => {
    expect(observable.get('nonExistentProp')).toBeUndefined();
    expect(observable.get('address.nonExistentProp')).toBeUndefined();
  });
});