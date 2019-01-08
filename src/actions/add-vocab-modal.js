import {
  createActions,
  handleActions,
} from 'redux-actions'

const defaultState = { show: false };

export const {
  addVocabModalShow,
  addVocabModalHide,
  addVocabModalSetLang1,
  addVocabModalSetLang2,
  addVocabModalClear,
} = createActions({
  ADD_VOCAB_MODAL_SHOW: () => {},
  ADD_VOCAB_MODAL_HIDE: () => {},
  ADD_VOCAB_MODAL_SET_LANG_1: (text) => ({ text }),
  ADD_VOCAB_MODAL_SET_LANG_2: (text) => ({ text }),
  ADD_VOCAB_MODAL_CLEAR: () => {},
});

export const reducer = handleActions(
  {
    [addVocabModalShow]: (
      state,
    ) => ({
      ...state,
      show: true,
    }),
    [addVocabModalHide]: (
      state,
    ) => ({
      ...state,
      show: false,
    }),
    [addVocabModalSetLang1]: (
      state,
      { payload: { text } }
    ) => ({
      ...state,
      lang1: text,
    }),
    [addVocabModalSetLang2]: (
      state,
      { payload: { text } }
    ) => ({
      ...state,
      lang2: text,
    }),
    [addVocabModalClear]: (
      state,
    ) => ({
      ...state,
      lang1: '',
      lang2: '',
    }),
  },
  defaultState
);
