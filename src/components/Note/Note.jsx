import React, { Component } from "react";
import { FaPen, FaStar } from "react-icons/fa6";

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
      <div className={ `note ${ this.props.note.color }-bg` }>
        <div className="header">
          <div className="star">
            <FaStar className={ `star-icon ${ this.props.note.color }` } />
          </div>
        </div>
        <textarea
          className={ `custom-scroll ${ this.props.note.color }-highlight` }
          placeholder={ this.props.note.placeholder }
        ></textarea>
        <div className="footer">
          <div className="date">
            <span
              className={ `note-date ${ this.props.note.color }-highlight` }>{ this.props.note.time }
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
