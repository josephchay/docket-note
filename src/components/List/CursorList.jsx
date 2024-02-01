import React, {Component} from 'react';
import CursorBall from "../Cursor/CursorBall";

import "./CursorList.css";

class CursorList extends Component {
  constructor(props) {
    super(props);

    this.baseSpeed = 0.3;
  }

  render() {
    return (
      <div className="cursors">
        {
          Array.from({ length: this.props.count }).map((_, index) => (
            <CursorBall
              key={ index }
              aimCoords={ this.props.aimCoords }
              speed={ this.baseSpeed - (index * 0.015) }
              scale={ (this.props.count - index * 0.4) / this.props.count }
            />
          ))
        }
      </div>
    );
  }
}

export default CursorList;
