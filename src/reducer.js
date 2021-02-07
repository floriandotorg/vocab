import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import { reducer as addVocabModal } from './actions/add-vocab-modal'
import { reducer as editVocabModal } from './actions/edit-vocab-modal'
import { reducer as deleteConfirmModal } from './actions/delete-confirm-modal'
import { reducer as learning } from './actions/learning'

export default () => combineReducers({
  firebase,
  addVocabModal,
  editVocabModal,
  deleteConfirmModal,
  learning,
})
