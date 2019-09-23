import React, { useState } from 'react';

import ControlsBar from './components/controls-bar';
import RoverRow from './components/rover-row';
import { isValidGridBoundaryString } from './utils/validation-utils';

const MAX_ROVERS = 10;
const MAX_X = 100;
const MAX_Y = 100;

/**
 * @typedef {Object} Rover
 * @property {number} id
 */

/**
 * @param {Rover[]} rovers
 */
export const removeRover = rovers => [...rovers.slice(0, rovers.length - 1)];

/**
 * @param {Rover[]} rovers
 */
export const addRover = rovers => [
  ...rovers,
  { id: rovers[rovers.length - 1].id + 1 }
];

/**
 * @param {Object} params
 * @param {string} params.gridBoundaryString
 * @param {(arg0: {x: number, y: number}) => void} params.setGridBoundary
 */
export function onGridBoundaryChangedHandler({
  gridBoundaryString,
  setGridBoundary
}) {
  if (isValidGridBoundaryString(gridBoundaryString)) {
    const [x, y] = gridBoundaryString.split(' ');
    const parsedState = { x: parseInt(x), y: parseInt(y) };
    setGridBoundary(
      (parsedState.x <= MAX_X && parsedState.y <= MAX_Y && parsedState) || null
    );
  } else {
    setGridBoundary(null);
  }
}

const App = () => {
  const [rovers, setRovers] = useState([{ id: 0 }]);
  const [gridBoundary, setGridBoundary] = useState(null);

  return (
    <div>
      <ControlsBar
        onGridBoundaryChanged={e =>
          onGridBoundaryChangedHandler({
            gridBoundaryString: e.target.value,
            setGridBoundary
          })
        }
        isGridBoundaryStringValid={!!gridBoundary}
        onRemoveButtonClick={() => {
          setRovers(removeRover(rovers));
        }}
        isRemoveButtonDisabled={rovers.length === 1}
        onAddButtonClick={() => {
          setRovers(addRover(rovers));
        }}
        isAddButtonDisabled={rovers.length === MAX_ROVERS}
      />
      {rovers.map(rover => (
        <RoverRow key={rover.id} gridBoundary={gridBoundary} {...rover} />
      ))}
    </div>
  );
};

export default App;
