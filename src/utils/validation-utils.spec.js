import {
  isValidZeroedString,
  isValidStateString,
  isValidInstructions,
  isValidGridBoundary,
  isValidState
} from './validation-utils';

describe('isValidZeroedString', () => {
  it('should return false when string is empty string', () => {
    const actual = isValidZeroedString('');

    expect(actual).toBeFalsy();
  });

  it.each`
    str
    ${'00'}
    ${'01'}
  `(
    'should return false when string starts with invalid zero (i.e. $str)',
    ({ str }) => {
      const actual = isValidZeroedString(str);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    str
    ${'0'}
    ${'10'}
    ${'101'}
  `('should return true when string is valid (i.e. $str)', ({ str }) => {
    const actual = isValidZeroedString(str);

    expect(actual).toBeTruthy();
  });
});

describe('isValidStateString', () => {
  it('should return false when state is empty string', () => {
    const actual = isValidStateString('');

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
      const actual = isValidStateString(state);

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
      const actual = isValidStateString(state);

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
      const actual = isValidStateString(state);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    state
    ${'0 00 N'}
    ${'00 0 N'}
  `(
    'should return false when state contains an all-zeroed string with length greater than 1 (i.e. $state)',
    ({ state }) => {
      const actual = isValidStateString(state);

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
    const actual = isValidStateString(state);

    expect(actual).toBeTruthy();
  });
});

describe('isValidInstructions', () => {
  it('should return false when instructions is empty string', () => {
    const actual = isValidInstructions('');

    expect(actual).toBeFalsy();
  });

  it('should return false when instructions exceed 20 chars', () => {
    const actual = isValidInstructions('LMRLMRLMRLMRLMRLMRLMR');

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

  it.each`
    instructions
    ${'L'}
    ${'LMRLMR'}
    ${'LMRLMRLMRLMRLMRLMRLM'}
  `(
    'should return true when instructions is valid (i.e. $instructions)',
    ({ instructions }) => {
      const actual = isValidInstructions(instructions);

      expect(actual).toBeTruthy();
    }
  );
});

describe('isValidGridBoundary', () => {
  it('should return false when grid boundary is empty string', () => {
    const actual = isValidGridBoundary('');

    expect(actual).toBeFalsy();
  });

  it.each`
    boundary
    ${' 5 5'}
    ${'5  5'}
    ${'5 5 '}
  `(
    'should return false when grid boundary contains an invalid whitespace (i.e. $boundary)',
    ({ boundary }) => {
      const actual = isValidGridBoundary(boundary);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    boundary
    ${'A 5'}
    ${'5 A'}
  `(
    'should return false when grid boundary contains non-approved character (i.e. $boundary)',
    ({ boundary }) => {
      const actual = isValidGridBoundary(boundary);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    boundary
    ${'-1 5'}
    ${'5 -1'}
  `(
    'should return false when grid boundary contains a coordinate off the grid (i.e. $boundary)',
    ({ boundary }) => {
      const actual = isValidGridBoundary(boundary);

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    boundary
    ${'5 5'}
    ${'10 5'}
    ${'5 10'}
    ${'10 10'}
  `(
    'should return true when grid boundary is valid (i.e. $boundary)',
    ({ boundary }) => {
      const actual = isValidGridBoundary(boundary);

      expect(actual).toBeTruthy();
    }
  );
});

describe('isValidState', () => {
  const gridBoundary = { x: 5, y: 5 };

  it.each`
    state
    ${{ x: 6, y: 0 }}
    ${{ x: 0, y: 6 }}
    ${{ x: -1, y: 0 }}
    ${{ x: 0, y: -1 }}
  `(
    'should return false when state exceeds the boundary (i.e. $state)',
    ({ state }) => {
      const actual = isValidState({ state, gridBoundary });

      expect(actual).toBeFalsy();
    }
  );

  it.each`
    state
    ${{ x: 0, y: 5 }}
    ${{ x: 5, y: 0 }}
    ${{ x: 3, y: 3 }}
  `(
    'should return true when state does not exceed the boundary (i.e. $state)',
    ({ state }) => {
      const actual = isValidState({ state, gridBoundary });

      expect(actual).toBeTruthy();
    }
  );
});
