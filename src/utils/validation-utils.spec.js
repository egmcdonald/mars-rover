import { isValidState, isValidInstructions } from './validation-utils';

describe('isValidState', () => {
  it('should return false when state is empty string', () => {
    const actual = isValidState('');

    expect(actual).toBeFalsy();
  });

  it.each`
    state
    ${' 0 0 N'}
    ${'0  0 N'}
    ${'0 0  N'}
    ${'0 0 N '}
  `(
    'should return false when state contains an invalid whitespace (i.e. $state)',
    ({ state }) => {
      const actual = isValidState(state);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    state
    ${'A 0 N'}
    ${'0 A N'}
    ${'0 0 A'}
  `(
    'should return false when state contains an invalid value (i.e. $state)',
    ({ state }) => {
      const actual = isValidState(state);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    state
    ${'-1 0 N'}
    ${'0 -1 N'}
  `(
    'should return false when state contains a coordinate off the grid (i.e. $state)',
    ({ state }) => {
      const actual = isValidState(state, { maxX: 5, maxY: 5 });

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    state
    ${'10 0 N'}
    ${'0 10 E'}
    ${'10 0 S'}
    ${'0 10 W'}
  `('should return true when state is valid (i.e. $state)', ({ state }) => {
    const actual = isValidState(state);

    expect(actual).toBeTruthy();
  });
});

describe('isValidInstructions', () => {
  it('should return false when instructions is empty string', () => {
    const actual = isValidInstructions('');

    expect(actual).toBeFalsy();
  });

  it.each`
    instructions
    ${' LRM'}
    ${'LR MR'}
    ${'LRM '}
  `(
    'should return false when state contains an invalid whitespace (i.e. $instructions)',
    ({ instructions }) => {
      const actual = isValidInstructions(instructions);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    instructions
    ${'ALMR'}
    ${'LMR0'}
  `(
    'should return false when instructions contains non-approved character (i.e. $instructions)',
    ({ instructions }) => {
      const actual = isValidInstructions(instructions);

      expect(actual).toBeFalsy();
    }
  );

  it('should return true when instructions is valid', () => {
    const actual = isValidInstructions('LMRLMR');

    expect(actual).toBeTruthy();
  });
});
