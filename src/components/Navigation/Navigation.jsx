import React, { Component, createRef } from 'react';

import { motion } from "framer-motion";
import { interpret } from "xstate";
import { toggleMachine } from "./NavigationState";
import anime from "animejs";

import plusIcon from "../../assets/icons/plus.svg";

import ColorSelector from "./ColorSelector";

import "./Nagivation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.colorSelectors = [
      { order: "first", color: "yellow", isSubsequent: false, dataFrom: "0", dataTo: "80" },
      { order: "second", color: "orange", isSubsequent: true, dataFrom: "100", dataTo: "140" },
      { order: "third", color: "green", isSubsequent: true, dataFrom: "160", dataTo: "200" },
      { order: "fourth", color: "blue", isSubsequent: true, dataFrom: "220", dataTo: "260" },
      { order: "fifth", color: "purple", isSubsequent: true, dataFrom: "280", dataTo: "320" },
      { order: "sixth", color: "pink", isSubsequent: true, dataFrom: "340", dataTo: "380" },
      { order: "seventh", color: "red", isSubsequent: true, dataFrom: "400", dataTo: "440" },
    ];

    this.navActivator = createRef();
  }

  disableActivator() {
    this.navActivator.current.setAttribute('disabled', '');
  }

  enableActivator() {
    this.navActivator.current.removeAttribute('disabled');
  }

  open() {
    const tl = anime.timeline();

    this.disableActivator();
    tl.add({
      targets: this.navActivator.current,
      translateY: [0, -14, 0],
      scale: [1, .8, 1],
      rotate: 316,
      duration: 800,
      easing: 'easeInOutSine',
    }).add({
        targets: '.color-selectors .first',
        translateY: [0, 80],
        duration: 3200,
        scaleY: [1.8, 1],
      }, '-=400'
    ).add({
      targets: '.color-selectors .subsequent',
      translateY: (el) => {
        return [el.getAttribute('data-from'), el.getAttribute('data-to')];
      },
      scaleY: [0, 1],
      duration: 1600,
      opacity: {
        value: 1,
        duration: 10,
      },
      delay: anime.stagger(240),
      complete: () => {
        this.enableActivator();
      }
    }, '-=2600');
  }

  close() {
    const tl = anime.timeline();

    this.disableActivator();
    tl.add({
      targets: this.navActivator.current,
      rotate: 0,
      duration: 600,
      easing: 'easeInOutSine',
    }).add({
      targets: '.color-selectors .selector',
      translateY: (el) => {
        return [el.getAttribute('data-to'), 0];
      },
      duration: 400,
      delay: anime.stagger(80),
      easing: 'easeInOutSine',
      complete: () => {
        this.enableActivator();
      }
    }, '-=400');
  }

  interpretToggleMachine() {
    const toggleService = interpret(toggleMachine);

    toggleService.onTransition((state) => {
      if (state.value === 'active') {
        this.open();
      } else if (state.value === 'inactive') {
        this.close();
      }
    }).start();

    return toggleService;
  }

  render() {
    const toggleService = this.interpretToggleMachine();

    return (
      <div className="nav">
        <motion.div
          initial={{
            opacity: 0,
            translateX: -140,
            scale: 1.04,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 120,
          }}
          className="logo"
        >
          <h4>Docket</h4>
        </motion.div>
        <div
          className="activator-container"
        >
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 240,
              delay: 0.3,
            }}
            className="activator"
          >
            <button
              id="navActivator"
              ref={ this.navActivator }
              onClick={ () => toggleService.send("TOGGLE") }
            >
              <img src={ plusIcon } alt="Plus Icon" />
            </button>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.6,
            }}
            className="color-selectors"
          >
            {
              this.colorSelectors.map((selector, index) => (
                <ColorSelector
                  key={ index }
                  className={`selector ${ selector.order } ${ selector.isSubsequent ? 'subsequent' : '' } ${ selector.color }-bg`}
                  color={ selector.color }
                  dataFrom={ selector.dataFrom }
                  dataTo={ selector.dataTo }
                  addNote={ this.props.addNote }
                />
              ))
            }
          </motion.div>
        </div>
      </div>
    );
  }
}

export default Navigation;
