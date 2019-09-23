/**
 * @param {string} state
 */
export const isValidState = state =>
  state && state.match(/^\d+\s\d+\s[N|E|S|W]$/);

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
