import React, { Component } from 'react';
import ColorSelector from "./ColorSelector";

import plusIcon from "../../assets/icons/plus.svg";

import "./Nagivation.css"

class Navigation extends Component {
  render() {
    const colorSelectors = [
      { order: "first", isOther: false, dataFrom: "0", dataTo: "80" },
      { order: "second", isOther: true, dataFrom: "100", dataTo: "140" },
      { order: "third", isOther: true, dataFrom: "160", dataTo: "200" },
      { order: "fourth", isOther: true, dataFrom: "220", dataTo: "260" },
      { order: "fifth", isOther: true, dataFrom: "280", dataTo: "320" },
    ];

    return (
      <div className="nav">
        <div className="logo">
          <h4>Docket</h4>
        </div>
        <div className="notes-container">
          <div className="add-button">
            <button id="addNote">
              <img src={ plusIcon } alt="Plus Icon" />
            </button>
          </div>
          <div className="note-selectors">
            {
              colorSelectors.map((selector, index) => (
                <ColorSelector
                  key={index}
                  className={`selector ${selector.order} ${selector.isOther ? 'other' : ''}`}
                  dataFrom={selector.dataFrom}
                  dataTo={selector.dataTo}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
