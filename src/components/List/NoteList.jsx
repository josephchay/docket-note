import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Note from "../Note/Note";

import "./NoteList.css";
import { itemsPerFlexRow } from "../../utils/math";

const NoteList = ({
  notes,
  deleteNote,
  updateText,
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

  const reversedNotes = reverse(notes);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setRenderFirstRow(true);
    }, 150);

    const delayTimerItemsPerRow = setTimeout(() => {
      setNumPerRow(itemsPerFlexRow(ref));
    }, 200);

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
            reversedNotes?.length > 0 ? (
              reversedNotes.map((item, index) => (
                <Note
                  key={ item.id }
                  delay={ (index % numPerRow + 1) * 0.16 }
                  note={ item }
                  deleteNote={ deleteNote }
                  updateText={ updateText }
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No notes found</h3>
                <p>Click on the <strong>+</strong> icon to add a note</p>
              </div>
            )
          )
        }
      </div>
    </main>
  )
}

export default NoteList;
