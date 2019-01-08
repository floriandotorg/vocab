import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { firebase as fbConfig, reduxFirebase as rfConfig } from './config'
import configureStore from './store'
import App from './components/app'

const history = createBrowserHistory();

const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState, history)

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig)
}

render(<App
  store={store}
  firebase={firebase}
  rfConfig={rfConfig}
  history={history}
/>, document.getElementById('app'));

// module.hot.accept();
