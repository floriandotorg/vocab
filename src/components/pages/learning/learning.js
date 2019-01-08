import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase, firebaseConnect, getVal } from 'react-redux-firebase'
import Card from './card'

@connect(
  state => ({
    currentVocabId: state.learning.vocabs[state.learning.currentVocab],
  })
)
export default class Learning extends Component {
  render() {
    const { currentVocabId } = this.props;

    return (
      <Card vocabId={currentVocabId} />
    )
  }
}
