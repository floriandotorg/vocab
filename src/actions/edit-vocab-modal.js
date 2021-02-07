import {
  createActions,
  handleActions,
} from 'redux-actions'

const defaultState = {};

export const {
  editVocabModalShow,
  editVocabModalHide,
  editVocabModalSetVocab,
} = createActions({
  EDIT_VOCAB_MODAL_SHOW: (id, vocab) => ({ id, vocab }),
  EDIT_VOCAB_MODAL_HIDE: () => {},
  EDIT_VOCAB_MODAL_SET_VOCAB: (vocab) => ({ vocab }),
});

export const reducer = handleActions(
  {
    [editVocabModalShow]: (
      state,
      { payload: { id, vocab } }
    ) => ({
      ...state,
      id,
      vocab
    }),
    [editVocabModalHide]: (
      state,
    ) => {
      const { id, vocab, ...newstate } = state;
      return newstate;
    },
    [editVocabModalSetVocab]: (
      state,
      { payload: { vocab } }
    ) => ({
      ...state,
      vocab,
    }),
  },
  defaultState
);
