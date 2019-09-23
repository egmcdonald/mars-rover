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
  instructions && instructions.match(/^[L|R|M]+$/);

/**
 * @param {string} boundary
 */
export const isValidGridBoundary = boundary =>
  boundary && boundary.match(/^\d+\s\d+$/);
