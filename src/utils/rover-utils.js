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

export function move({ bearing, x, y }) {
  const { x: xToMove, y: yToMove } = DIRECTIONS[bearing];
  return {
    x: x + xToMove,
    y: y + yToMove
  };
}

export function spin({ spinDirection, startBearing }) {
  const indexOfPreviousBearing = BEARINGS.findIndex(
    compassPoint => compassPoint === startBearing
  );
  const newBearing =
    spinDirection === 'L'
      ? (indexOfPreviousBearing + 4 - 1) % 4
      : (indexOfPreviousBearing + 1) % 4;
  return BEARINGS[newBearing];
}

export const calculateEndState = () => 'Ready to be calculated';
