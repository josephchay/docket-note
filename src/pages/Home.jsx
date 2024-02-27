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
    return JSON.parse(sessionStorage.getItem('DocketNoteProject')) || [];
  });

  const [notesSortText, setNotesSortText] = useState("");
  const [notesSortByFavorite, setNotesSortByFavorite] = useState(false);

  const toggleSortByFavorite = () => {
    setNotesSortByFavorite(!notesSortByFavorite);
  }

  const addNote = (color) => {
    const newNotes = [...notes];

    newNotes.push({
      id: id(),
      text: "",
      placeholder: "Docket this note...",
      time: formattedDateNow(),
      color,
      favorite: false,
      lock: false,
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

  const updateFavourite = (id) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    );
    setNotes(newNotes);
  }

  const updateLock = (id) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, lock: !note.lock } : note
    );
    setNotes(newNotes);
  }

  useEffect(() => {
    sessionStorage.setItem("DocketNoteProject", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="home custom-scroll">
      <Navigation
        addNote={ addNote }
      />
      <GooeyEffectSvg
        id="colorSelectors"
      />
      <Header
        setNotesSortText={ setNotesSortText }
        notesSortByFavorite={ notesSortByFavorite }
        setNotesSortByFavorite={ toggleSortByFavorite }
      />
      <NoteList
        notes={ notes }
        deleteNote={ deleteNote }
        updateText={ updateText }
        updateFavourite={ updateFavourite }
        updateLock={ updateLock }
        sortText={ notesSortText }
        sortFavorite={ notesSortByFavorite }
      />
    </div>
  );
}

export default Home;
