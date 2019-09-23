import {
  onStartStateChangeHandler,
  onInstructionsChangeHandler
} from './rover-row';

describe('onStartStateChangeHandler', () => {
  let setStartStateMock;

  const defaultParams = {
    startStateString: '0 0 N',
    gridBoundary: { x: 5, y: 5 }
  };

  beforeEach(() => {
    setStartStateMock = jest.fn();

    defaultParams.setStartState = setStartStateMock;
  });

  afterEach(() => {
    setStartStateMock.mockReset();
  });

  it('should set start state to null when start state string is invalid', () => {
    onStartStateChangeHandler({
      ...defaultParams,
      startStateString: 'foo'
    });

    expect(setStartStateMock).toHaveBeenCalledWith(null);
  });

  it('should set start state to null when grid boundary is not defined', () => {
    onStartStateChangeHandler({
      ...defaultParams,
      gridBoundary: null
    });

    expect(setStartStateMock).toHaveBeenCalledWith(null);
  });

  it.each`
    startStateString
    ${'6 0 N'}
    ${'0 6 N'}
  `(
    'should set start state to null when parsed state exceeds boundary (i.e. $startStateString)',
    ({ startStateString }) => {
      onStartStateChangeHandler({
        ...defaultParams,
        startStateString
      });

      expect(setStartStateMock).toHaveBeenCalledWith(null);
    }
  );

  it('should set start state when given valid params', () => {
    onStartStateChangeHandler(defaultParams);

    expect(setStartStateMock).toHaveBeenCalledWith({
      x: 0,
      y: 0,
      bearing: 'N'
    });
  });
});

describe('onInstructionsChangeHandler', () => {
  let setInstructionsMock;

  const defaultParams = {
    instructionsString: 'LMR'
  };

  beforeEach(() => {
    setInstructionsMock = jest.fn();

    defaultParams.setInstructions = setInstructionsMock;
  });

  afterEach(() => {
    setInstructionsMock.mockReset();
  });

  it('should set instructions to null when instructions string is invalid', () => {
    onInstructionsChangeHandler({
      ...defaultParams,
      instructionsString: 'foo'
    });

    expect(setInstructionsMock).toHaveBeenCalledWith(null);
  });

  it('should set instructions when given valid params', () => {
    onInstructionsChangeHandler(defaultParams);

    expect(setInstructionsMock).toHaveBeenCalledWith('LMR');
  });
});
