import { removeRover, addRover, onGridBoundaryChangedHandler } from './app';

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

describe('onGridBoundaryChangedHandler', () => {
  let setGridBoundaryMock;

  const defaultParams = {
    gridBoundaryString: '5 5'
  };

  beforeEach(() => {
    setGridBoundaryMock = jest.fn();

    defaultParams.setGridBoundary = setGridBoundaryMock;
  });

  afterEach(() => {
    setGridBoundaryMock.mockReset();
  });

  it('should set grid boundary to null when grid boundary is invalid', () => {
    onGridBoundaryChangedHandler({
      ...defaultParams,
      gridBoundaryString: 'foo'
    });

    expect(setGridBoundaryMock).toHaveBeenCalledWith(null);
  });

  it.each`
    gridBoundaryString
    ${'101 0'}
    ${'0 101'}
  `(
    'should set grid boundary to null when grid boundary exceeds 100 (i.e. $gridBoundaryString)',
    ({ gridBoundaryString }) => {
      onGridBoundaryChangedHandler({
        ...defaultParams,
        gridBoundaryString
      });

      expect(setGridBoundaryMock).toHaveBeenCalledWith(null);
    }
  );

  it('should set grid boundary when given valid string', () => {
    onGridBoundaryChangedHandler(defaultParams);

    expect(setGridBoundaryMock).toHaveBeenCalledWith({ x: 5, y: 5 });
  });
});
