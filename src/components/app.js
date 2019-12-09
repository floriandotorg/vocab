import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { createBrowserHistory } from 'history'
import { compose, createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { firebase as fbConfig, reduxFirebase as rfConfig } from '../config'
import createRootReducer from '../reducer'
import { Navigation } from './navigation'
import { setVocabs, getSimilarity } from '../similarity-cache'
import { Routes } from './routes'
import { AddVocabModal } from './add-vocab-modal'
import { EditVocabModal } from './edit-vocab-modal'
import { DeleteConfirmModal } from './delete-confirm-modal'

const history = createBrowserHistory()

firebase.initializeApp(fbConfig)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const cacheMiddleware = store => next => action => {
  if (action.type === '@@reactReduxFirebase/SET' && !action.throttledUpdate) {
    setVocabs(action.ordered, () => {
      action.ordered = action.ordered.map(vocab => ({
        key: vocab.key,
        value: {
          ...vocab.value,
          duplicateRating: getSimilarity(vocab)
        }
      }))
      action.throttledUpdate = true
      store.dispatch(action)
    })
  }

  return next(action)
}

const store = createStore(
  createRootReducer(history),
  {},
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      cacheMiddleware,
    )
  )
)

const rrfProps = {
  firebase,
  config: rfConfig,
  dispatch: store.dispatch,
}

export const App = () =>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ConnectedRouter history={history}>
        <div className="pt-5">
          <Navigation />
          <Routes />

          <AddVocabModal />
          <EditVocabModal />
          <DeleteConfirmModal />
        </div>
      </ConnectedRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
