import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaPen, FaStar } from "react-icons/fa6";

import "./Note.css";
import useLongPress from "../../hooks/useLongPress";
import { FaEye, FaTrash } from "react-icons/fa";

let debounceTimer = 500, debounceTimeout;

const Note = ({
  delay,
  note,
  deleteNote,
  updateText,
  updateFavorite,
  updateLock,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteCompleted, setDeleteCompleted] = useState(false);

  const [deleteTimeout, setDeleteTimeout] = useState(null);

  const debounce = (func) => {
    clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
      func();
    }, debounceTimer);
  }

  const handleTextUpdate = (text, id) => {
    debounce(() => updateText(text, id));
  }

  const handlePressHold = () => {
    setIsDeleting(true);

    const timeoutId = setTimeout(() => {
      setDeleteConfirmed(true);

      setTimeout(() => {
        deleteNote(note.id);

        setDeleteCompleted(true);
        setDeleteConfirmed(false);

        setTimeout(() => {
          setDeleteCompleted(false);
        }, 600);
      }, 600);
    }, 1000);

    setDeleteTimeout(timeoutId);
  }

  const handlePressRelease = () => {
    setIsDeleting(false);

    clearTimeout(deleteTimeout);
  }

  const longPressEvent = useLongPress(handlePressHold, () => {}, handlePressRelease, {
    shouldPreventDefault: true,
    delay: 800,
  });

  const handleFavorite = () => {
    updateFavorite(note.id);
  }

  const handleEditable = () => {
    updateLock(note.id);
  }

  return (
    <motion.div
      key={ note.id }
      layout
      animate={
        deleteConfirmed ? {
          scale: .2,
        } : isDeleting ? {
          scale: .26,
        } : {
          scale: 1,
        }
      }
      exit={
        deleteCompleted ? {
          scale: 0,
          transition: {
            duration: .8,
            type: "spring",
            stiffness: 100,
          }
        } : {}
      }
      transition={{
        duration: .8,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      { ...longPressEvent }
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
        exit={
          deleteCompleted ? {} : {
            opacity: 0,
            translateY: -80,
            scale: 1.04,
            transition: {
              duration: .2,
              ease: "easeIn",
              delay: delay,
            }
          }
        }
        whileHover={{
          scale: 1.06
        }}
        whileTap={{
          scale: 0.96
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          delay: delay,
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 17,
          },
        }}
        style={{
          borderRadius: isDeleting ? "50%" : "24px",
        }}
        className={ `note ${ note.color }-bg` }
      >
        <div className="header">
          <motion.div
            initial={{
              opacity: 0,
              scale: 1,
              translateX: 0,
              translateY: -80,
            }}
            animate={
              isDeleting ? {
                opacity: 0,
                scale: .8,
                translateX: -80,
                translateY: 80,
              } : {
                opacity: 1,
                scale: 1,
                translateX: 0,
                translateY: 0,
              }
            }
            whileHover={{
              scale: 1.2,
            }}
            onClick={ handleFavorite }
            transition={{
              type: "spring",
              stiffness: 240,
            }}
            style={{
              backgroundColor: note.favorite ? "var(--black-color)" : "var(--black-even-more-transclucent-color)",
            }}
            className="star"
          >
            <FaStar
              className={ `star-icon ${ note.color }` }
            />
          </motion.div>
        </div>
        <motion.textarea
          initial={{
            opacity: 0,
            scale: 1,
          }}
          animate={
            isDeleting ? {
              opacity: 0,
              scale: .4,
            } : {
              opacity: 1,
              scale: 1,
            }
          }
          disabled={ note.lock }
          placeholder={ note.lock ? '' : note.placeholder }
          defaultValue={ note.text }
          onInput={ (e) => handleTextUpdate(e.target.value, note.id) }
          style={{
            color: note.lock ? "var(--black-transclucent-color)" : "var(--black-color)",
          }}
          className={ `custom-scroll ${ note.color }-highlight` }
        ></motion.textarea>
        <div
          className="trash-container"
          style={{
            display: isDeleting ? "flex" : "none",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={
              deleteConfirmed ? {
                opacity: 1,
                scale: 1.34,
              } : isDeleting ? {
                opacity: 1,
                scale: 1,
              } : {
                opacity: 0,
                scale: 0,
              }
            }
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              delay: .2,
            }}
            className={ `trash ${ note.color }` }
          >
            <FaTrash
              className="trash-icon"
            />
          </motion.div>
        </div>
        <div className="footer">
          <motion.div
            initial={{
              opacity: 0,
              scale: 1,
              translateX: 0,
              translateY: 0,
            }}
            animate={
              isDeleting ? {
                opacity: 0,
                scale: .8,
                translateX: 80,
                translateY: -80,
              } : {
                opacity: 1,
                scale: 1,
                translateX: 0,
                translateY: 0,
              }
            }
            className="date"
          >
            <span
              className={ `note-date ${ note.color }-highlight` }
            >
              { note.time }
            </span>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 1,
              translateX: 0,
              translateY: 0,
            }}
            animate={
              isDeleting ? {
                opacity: 0,
                scale: .8,
                translateX: -80,
                translateY: -80,
              } : {
                opacity: 1,
                scale: 1,
                translateX: 0,
                translateY: 0,
              }
            }
            whileHover={{
              scale: 1.2,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
            }}
            onClick={ handleEditable }
            className="edit"
          >
            {
              note.lock ? (
                <FaPen
                  className="edit-icon"
                />
              ) : (
                <FaEye
                  size={ 14 }
                  className="edit-icon"
                />
              )
            }
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Note;
