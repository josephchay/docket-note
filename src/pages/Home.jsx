import React, { useEffect, useState } from 'react';

import { id } from "../utils/math";
import { formattedDateNow } from "../utils/date";
import Navigation from "../components/Navigation/Navigation";
import GooeyEffectSvg from "../components/Svg/GooeyEffectSvg";
import Header from "../components/Header/Header";
import NoteList from "../components/List/NoteList";

import "./Home.css";

const Home = () => {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('DocketNoteProject')) || [];
  });

  const addNote = (color) => {
    const newNotes = [...notes];

    newNotes.push({
      id: id(),
      text: "",
      placeholder: "Docket this note...",
      time: formattedDateNow(),
      color,
    });

    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  const updateText = (text, id) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, text } : note
    );
    setNotes(newNotes);
  }

  useEffect(() => {
    localStorage.setItem("DocketNoteProject", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="home custom-scroll">
      <Navigation
        addNote={ addNote }
      />
      <GooeyEffectSvg
        id="colorSelectors"
      />
      <Header />
      <NoteList
        notes={ notes }
        deleteNote={ deleteNote }
        updateText={ updateText }
      />
    </div>
  );
}

export default Home;
