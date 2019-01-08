import {
  createActions,
  handleActions,
} from 'redux-actions'

const defaultState = {};

export const {
  deleteConfirmModalShow,
  deleteConfirmModalHide,
} = createActions({
  DELETE_CONFIRM_MODAL_SHOW: (id, vocab) => ({ id, vocab }),
  DELETE_CONFIRM_MODAL_HIDE: () => {},
});

export const reducer = handleActions(
  {
    [deleteConfirmModalShow]: (
      state,
      { payload: { id, vocab } }
    ) => ({
      ...state,
      id,
      vocab,
    }),
    [deleteConfirmModalHide]: (
      state,
    ) => {
      const { id, vocab, ...newstate } = state;
      return newstate;
    },
  },
  defaultState
);
