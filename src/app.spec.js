import { removeRover, addRover } from './app';

describe('removeRover', () => {
  it('removes rover from end of array', () => {
    const expected = [{ id: 0 }, { id: 1 }];
    const actual = removeRover([{ id: 0 }, { id: 1 }, { id: 2 }]);

    expect(actual).toEqual(expected);
  });
});

describe('addRover', () => {
  it('adds a rover to end of array', () => {
    const expected = [{ id: 0 }, { id: 1 }, { id: 2 }];
    const actual = addRover([{ id: 0 }, { id: 1 }]);

    expect(actual).toEqual(expected);
  });
});
