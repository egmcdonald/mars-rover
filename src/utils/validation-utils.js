/**
 * @param {string} str
 */
export const isValidZeroedString = str => str && str.match(/^(0|[1-9]\d*)$/);

/**
 * @param {string} state
 */
export const isValidStateString = state => {
  const valid = state && state.match(/^\d+\s\d+\s[N|E|S|W]$/);
  const splitValid = valid && state.split(' ');
  return (
    valid &&
    isValidZeroedString(splitValid[0]) &&
    isValidZeroedString(splitValid[1])
  );
};

/**
 * @param {string} instructions
 */
export const isValidInstructions = instructions =>
  instructions && instructions.match(/^[L|R|M]+$/) && instructions.length <= 20;

/**
 * @param {string} boundary
 */
export const isValidGridBoundary = boundary => {
  const valid = boundary && boundary.match(/^\d+\s\d+$/);
  const splitValid = valid && boundary.split(' ');
  return (
    valid &&
    isValidZeroedString(splitValid[0]) &&
    isValidZeroedString(splitValid[1])
  );
};

/**
 * @param {Object} params
 * @param {{x: number, y: number}} params.state
 * @param {{x: number, y: number}} params.gridBoundary
 */
export const isValidState = ({ state, gridBoundary }) =>
  state &&
  gridBoundary &&
  state.x >= 0 &&
  state.x <= gridBoundary.x &&
  state.y >= 0 &&
  state.y <= gridBoundary.y;
