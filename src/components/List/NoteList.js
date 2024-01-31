import React, { Component } from "react";
import Note from "../Note/Note";

import "./NoteList.css";

class NoteList extends Component {
  reverse(arr) {
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }

    return reversed;
  }

  render() {
    const notes = this.reverse(this.props.notes);

    return (
      <main className="main">
        <div className="header">
          <h2>Notes</h2>
        </div>
        <div className="notes">
          {
            notes.map((item) => (
              <Note
                key={ item.id }
                note={ item }
                placeholder={ item.placeholder }
                deleteNote={ this.props.deleteNote }
                updateText={ this.props.updateText }
              />
            ))
          }
        </div>
      </main>
    )
  }
}

export default NoteList;
