import React, { useState } from 'react';

import ControlsBar from './components/controls-bar';
import RoverRow from './components/rover-row';
import { isValidGridBoundary } from './utils/validation-utils';

const MAX_ROVERS = 10;

export const removeRover = rovers => [...rovers.slice(0, rovers.length - 1)];

export const addRover = rovers => [
  ...rovers,
  { id: rovers[rovers.length - 1].id + 1 }
];

const App = () => {
  const [rovers, setRovers] = useState([{ id: 0 }]);
  const [gridBoundary, setGridBoundary] = useState(null);

  return (
    <div>
      <ControlsBar
        onGridBoundaryChanged={e => {
          const gridString = e.target.value;
          if (isValidGridBoundary(gridString)) {
            const [x, y] = gridString.split(' ');
            setGridBoundary({ x: parseInt(x), y: parseInt(y) });
          } else {
            setGridBoundary(null);
          }
        }}
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
        <RoverRow key={rover.id} {...rover} />
      ))}
    </div>
  );
};

export default App;
