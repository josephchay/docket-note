import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Note from "../Note/Note";

import "./NoteList.css";
import { itemsPerFlexRow } from "../../utils/math";

const NoteList = ({
  notes,
  deleteNote,
  updateText,
  updateFavourite,
  updateLock,
  sortText,
  sortFavorite,
}) => {
  const ref = useRef(null);

  const [numPerRow, setNumPerRow] = useState(0);
  const [renderFirstRow, setRenderFirstRow] = useState(false);

  const reverse = (arr) => {
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }

    return reversed;
  }

  const [reverseNotes, setReverseNotes] = useState(reverse(notes));
  const [filteredNotes, setFilteredNotes] = useState([...reverseNotes]);

  const sortByText = (arr, text) => {
    return arr.filter((note) => note.text.toLowerCase().includes(text));
  }

  const sortByFavorite = (arr) => {
    return arr.filter((note) => note.favorite);
  }

  useEffect(() => {
    let filtered = reverse(notes);

    setReverseNotes(filtered);

    if (sortFavorite) {
      filtered = sortByFavorite(filtered);
    }

    setFilteredNotes(filtered);
  }, [notes, sortFavorite]);

  useEffect(() => {
    let sorted = sortByText(reverseNotes, sortText);

    if (sortFavorite) {
      sorted = sortByFavorite(sorted);
    }

    setFilteredNotes(sorted);
  }, [sortText, sortFavorite]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setRenderFirstRow(true);
    }, 250);

    const delayTimerItemsPerRow = setTimeout(() => {
      setNumPerRow(itemsPerFlexRow(ref));
    }, 300);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(delayTimerItemsPerRow);
    };
  }, []);

  return (
    <main className="main">
      <div className="header">
        <motion.h2
          initial={{
            opacity: 0,
            translateY: 80,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 160,
            delay: .2,
          }}
        >
          Notes
        </motion.h2>
      </div>
      <div
        ref={ ref }
        className="notes"
      >
        {
          renderFirstRow && (
            filteredNotes?.length > 0 ? (
              <AnimatePresence>
                {
                  filteredNotes.map((item, index) => (
                    <Note
                      key={ item.id }
                      delay={ (index % numPerRow + 1) * 0.16 }
                      note={ item }
                      deleteNote={ deleteNote }
                      updateText={ updateText }
                      updateFavorite={ updateFavourite }
                      updateLock={ updateLock }
                    />
                  ))
                }
              </AnimatePresence>
            ) : (
              <div
                className="empty-state"
              >
                <motion.h3
                  initial={{
                    opacity: 0,
                    translateY: 40,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 180,
                    delay: 0.2,
                  }}
                >
                  No notes found
                </motion.h3>
                <motion.p
                  initial={{
                    opacity: 0,
                    translateY: 40,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 180,
                    delay: 0.3,
                  }}
                >
                  Click on the
                  <motion.strong
                    initial={{
                      scale: .8,
                    }}
                    animate={{
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      delay: .8,
                    }}
                  >
                    +
                  </motion.strong>
                  icon to add a note
                </motion.p>
              </div>
            )
          )
        }
      </div>
    </main>
  )
}

export default NoteList;
