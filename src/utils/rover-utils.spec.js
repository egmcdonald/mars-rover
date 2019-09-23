import { calculateEndState } from './rover-utils';

describe('calculateEndState', () => {
  it.each`
    startState                      | instructions    | endState
    ${{ x: 1, y: 2, bearing: 'N' }} | ${'LMLMLMLMM'}  | ${{ x: 1, y: 3, bearing: 'N' }}
    ${{ x: 3, y: 3, bearing: 'E' }} | ${'MMRMMRMRRM'} | ${{ x: 5, y: 1, bearing: 'E' }}
  `(
    'should calculate end state for a rover when start state is $startState and instructions are $instructions',
    ({ startState, instructions, endState }) => {
      const actual = calculateEndState({ startState, instructions });

      expect(actual).toEqual(endState);
    }
  );
});
