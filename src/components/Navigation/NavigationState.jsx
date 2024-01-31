import { Machine } from 'xstate';

export const toggleMachine = Machine({
  id: 'toggleButton',
  initial: 'idle',
  states: {
    idle: {
      on: {
        TOGGLE: 'active',
      },
    },
    inactive: {
      on: {
        TOGGLE: 'active',
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      },
    },
  },
});
