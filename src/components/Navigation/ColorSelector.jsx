import React, { Component } from 'react';

class ColorSelector extends Component {
  render() {
    const { className, dataFrom, dataTo } = this.props;

    return (
      <div
        className={ className }
        data-from={ dataFrom }
        data-to={ dataTo }
      ></div>
    );
  }
}

export default ColorSelector;
