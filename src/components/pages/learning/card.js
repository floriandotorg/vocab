import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase, firebaseConnect, getVal, isLoaded } from 'react-redux-firebase'
import Start from './start'
import Speak from '../../speak'
import { editVocabModalShow } from '../../../actions/edit-vocab-modal'
import {
  learningNextCard,
  learningTurnCard,
} from '../../../actions/learning'

@withFirebase
@firebaseConnect(props => [
  `vocabs/${props.vocabId}`
])
@connect(
  (state, props) => ({
    vocab: getVal(state.firebase.data, `vocabs/${props.vocabId}`),
    currentSide: state.learning.currentSide,
  }),
  dispatch => ({
    learningNextCard: () => dispatch(learningNextCard()),
    learningTurnCard: () => dispatch(learningTurnCard()),
    editVocabModalShow: (id, vocab) => dispatch(editVocabModalShow(id, vocab, false)),
  })
)
export default class Card extends Component {
  turnCard = () => {
    this.props.learningTurnCard();
  }

  correct = () => {
    const { firebase, vocabId, vocab, learningNextCard } = this.props;

    firebase.set(`vocabs/${vocabId}`, {
      ...vocab,
      level: vocab.level + 1,
    });

    learningNextCard();
  }

  incorrect = () => {
    const { firebase, vocabId, vocab, learningNextCard } = this.props;

    firebase.set(`vocabs/${vocabId}`, {
      ...vocab,
      level: 0,
    });

    learningNextCard();
  }

  edit = () => {
    const { editVocabModalShow, vocabId, vocab } = this.props;
    editVocabModalShow(vocabId, vocab);
  }

  render() {
    const { vocab, currentSide } = this.props;

    return (
      <div className="mt-4 w-50 w-md-100 mx-auto">
        <div
          className="vocab-card"
          onClick={this.turnCard}
        >
          <p>
            {(isLoaded(vocab) ? vocab[`lang${currentSide}`] : 'Loading').split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>
            })}
          </p>
        </div>

        <div className="d-flex mt-4">
          <button
            type="button"
            className="btn flex-grow-1 flex-basis-0 btn-success mr-1"
            onClick={this.correct}
          >
            Richtig
          </button>

          <button
            type="button"
            className="btn flex-grow-1 flex-basis-0 btn-danger ml-1"
            onClick={this.incorrect}
          >
            Falsch
          </button>
        </div>

        <div className="d-flex mt-4">
          <button
            type="button"
            className="btn btn-small btn-light flex-grow-1 flex-basis-0 mr-1"
            onClick={this.edit}
          >
            Bearbeiten
          </button>

          <Speak
            className="ml-1"
            word={vocab.lang1}
          />
        </div>
      </div>
    )
  }
}
