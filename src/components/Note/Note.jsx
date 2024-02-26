import React from "react";
import { motion } from "framer-motion";

import { FaPen, FaStar } from "react-icons/fa6";

import "./Note.css";

let timer = 500, timeout;

const Note = ({
  delay,
  note,
  deleteNote,
  updateText,
}) => {
  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, timer);
  }

  const handleTextUpdate = (text, id) => {
    debounce(() => updateText(text, id));
  }

  return (
    <motion.div
      layout
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          translateY: 80,
          scale: 1.04,
        }}
        whileInView={{
          opacity: 1,
          translateY: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        whileHover={{
          scale: 1.06
        }}
        whileTap={{
          scale: 0.96
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 17
          },
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          delay: delay,
        }}
        className={ `note ${ note.color }-bg` }
      >
        <div className="header">
          <div className="star">
            <FaStar className={ `star-icon ${ note.color }` } />
          </div>
        </div>
        <textarea
          placeholder={ note.placeholder }
          className={ `custom-scroll ${ note.color }-highlight` }
        ></textarea>
        <div className="footer">
          <div className="date">
          <span
            className={ `note-date ${ note.color }-highlight` }>{ note.time }
          </span>
          </div>
          <div className="edit">
            <FaPen className="edit-icon"/>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Note;
