import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import firebase from 'firebase/app'
import './style.scss'

firebase.auth().signInAnonymously().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
.catch((error) => {
  console.error(error)
})
