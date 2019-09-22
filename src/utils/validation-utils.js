export const isValidState = state =>
  state && state.match(/^\d+\s\d+\s[N|E|S|W]$/);

export const isValidInstructions = instructions =>
  instructions && instructions.match(/^[L|R|M]+$/);
