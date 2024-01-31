import React, { Component } from "react";
import { FaPen, FaStar } from "react-icons/fa6";

import {
  NOTE_COLORS,
  NOTE_COLORS_NAMES
} from "../../constants/colors";

import "./Note.css";

let timer = 500, timeout;

class Note extends Component {
  debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, timer);
  }

  updateText = (text, id) => {
    this.debounce(() => this.props.updateText(text, id));
  }

  render() {
    return (
      <div className={ `note ${ NOTE_COLORS_NAMES[this.props.note.color] }` }>
        <div className="header">
          <div className="star">
            <FaStar className="star-icon" style={{ color: this.props.note.color }} />
          </div>
        </div>
        <textarea
          className="custom-scroll"
          placeholder={ this.props.note.placeholder }
        ></textarea>
        <div className="footer">
          <div className="date">
            <span
              className={ `note-date highlight-${ NOTE_COLORS_NAMES[this.props.note.color] }` }>{ this.props.note.time }
            </span>
          </div>
          <div className="edit">
            <FaPen className="edit-icon"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
