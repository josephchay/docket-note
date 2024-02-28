import React from 'react';

const ColorSelector = ({
  className,
  color,
  dataFrom,
  dataTo,
  addNote,
}) => {
  return (
    <div
      className={ className }
      data-from={ dataFrom }
      data-to={ dataTo }
      onClick={ () => addNote(color) }
    ></div>
  );
}

export default ColorSelector;
