import React, { Component } from 'react';

class ColorSelector extends Component {
  render() {
    const { className, color, dataFrom, dataTo, addNote } = this.props;

    return (
      <div
        className={ className }
        data-from={ dataFrom }
        data-to={ dataTo }
        onClick={ () => addNote(color) }
      ></div>
    );
  }
}

export default ColorSelector;
