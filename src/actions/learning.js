import _ from 'lodash'
import {
  createActions,
  handleActions,
} from 'redux-actions'

const defaultState = { };

export const {
  learningStart,
  learningNextCard,
  learningTurnCard,
} = createActions({
  LEARNING_START: (vocabs) => ({ vocabs }),
  LEARNING_NEXT_CARD: () => {},
  LEARNING_TURN_CARD: () => {},
});

export const reducer = handleActions(
  {
    [learningStart]: (
      state,
      { payload: { vocabs } }
    ) => ({
      ...state,
      vocabs: _.shuffle(vocabs),
      currentVocab: 0,
      currentSide: Math.random() > 0.5 ? 1 : 2,
    }),
    [learningNextCard]: (
      state,
    ) => {
      if (state.currentVocab < state.vocabs.length - 1) {
        return {
          ...state,
          currentVocab: state.currentVocab + 1,
          currentSide: Math.random() > 0.5 ? 1 : 2,
        }
      } else {
        const { vocabs, currentVocab, currentSide, ...newstate } = state;
        return newstate;
      }
    },
    [learningTurnCard]: (
      state,
    ) => ({
      ...state,
      currentSide: state.currentSide === 1 ? 2 : 1,
    }),
  },
  defaultState
);
