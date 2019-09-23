const DIRECTIONS = {
  N: {
    x: 0,
    y: 1
  },
  E: {
    x: 1,
    y: 0
  },
  S: {
    x: 0,
    y: -1
  },
  W: {
    x: -1,
    y: 0
  }
};

const BEARINGS = Object.keys(DIRECTIONS);

/**
 * @param {Object} params
 * @param {string} params.bearing
 * @param {number} params.x
 * @param {number} params.y
 */
export function move({ bearing, x, y }) {
  const { x: xToMove, y: yToMove } = DIRECTIONS[bearing];
  return {
    x: x + xToMove,
    y: y + yToMove
  };
}

/**
 * @param {Object} params
 * @param {string} params.spinDirection
 * @param {string} params.startBearing
 */
export function spin({ spinDirection, startBearing }) {
  const indexOfPreviousBearing = BEARINGS.findIndex(
    compassPoint => compassPoint === startBearing
  );
  return BEARINGS[
    spinDirection === 'L'
      ? (indexOfPreviousBearing + 4 - 1) % 4
      : (indexOfPreviousBearing + 1) % 4
  ];
}

/**
 * @param {Object} params
 * @param {{x: number, y: number, bearing: string}} params.startState
 * @param {string} params.instructions
 */
export const calculateEndState = ({ startState, instructions }) =>
  instructions.split('').reduce((current, instruction) => {
    return instruction === 'M'
      ? { ...current, ...move(current) }
      : {
          ...current,
          bearing: spin({
            spinDirection: instruction,
            startBearing: current.bearing
          })
        };
  }, startState);
