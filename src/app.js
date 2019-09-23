import React, { useState } from 'react';

import ButtonContainer from './components/button-container';
import RoverRow from './components/rover-row';

const MAX_ROVERS = 10;

export const removeRover = rovers => [...rovers.slice(0, rovers.length - 1)];

export const addRover = rovers => [
  ...rovers,
  { id: rovers[rovers.length - 1].id + 1 }
];

const App = () => {
  const [rovers, setRovers] = useState([{ id: 0 }]);

  return (
    <div>
      <ButtonContainer
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
