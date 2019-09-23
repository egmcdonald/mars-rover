import { move, spin, calculateEndState } from './rover-utils';

describe('move', () => {
  it.each`
    bearing | endX | endY
    ${'N'}  | ${5} | ${6}
    ${'E'}  | ${6} | ${5}
    ${'S'}  | ${5} | ${4}
    ${'W'}  | ${4} | ${5}
  `(
    'should move to ($endX, $endY) when given bearing $bearing and starting point (5,5)',
    ({ bearing, endX, endY }) => {
      const expected = { x: endX, y: endY };
      const actual = move({ bearing, x: 5, y: 5 });

      expect(actual).toEqual(expected);
    }
  );
});

describe('spin', () => {
  it.each`
    spinDirection | startBearing | endBearing
    ${'L'}        | ${'N'}       | ${'W'}
    ${'L'}        | ${'E'}       | ${'N'}
    ${'L'}        | ${'S'}       | ${'E'}
    ${'L'}        | ${'W'}       | ${'S'}
    ${'R'}        | ${'N'}       | ${'E'}
    ${'R'}        | ${'E'}       | ${'S'}
    ${'R'}        | ${'S'}       | ${'W'}
    ${'R'}        | ${'W'}       | ${'N'}
  `(
    'should spin $spinDirection to $endBearing when starting at $startBearing',
    ({ spinDirection, startBearing, endBearing }) => {
      const expected = endBearing;
      const actual = spin({ spinDirection, startBearing });

      expect(actual).toEqual(expected);
    }
  );
});

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
