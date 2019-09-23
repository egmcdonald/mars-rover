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

export function move({ bearing, x, y }) {
  const { x: xToMove, y: yToMove } = DIRECTIONS[bearing];
  return {
    x: x + xToMove,
    y: y + yToMove
  };
}

export const spin = () => '';

export const calculateEndState = () => 'Ready to be calculated';
