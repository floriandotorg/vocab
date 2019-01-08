import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Start from './start'
import Learning from './learning'
import { learningStart } from '../../../actions/learning'

@firebaseConnect(() => [
  'vocabs',
])
@connect(
  state => ({
    vocabs: state.firebase.ordered.vocabs,
    learningInProgress: !!state.learning.vocabs,
  }),
  dispatch => ({
    learningStart: vocabs => dispatch(learningStart(vocabs)),
  })
)
export default class Index extends Component {
  start = level => () => {
    const { learningStart, vocabs } = this.props;
    learningStart(_(vocabs).filter(['value.level', level]).map('key').value());
  }

  render() {
    const { vocabs } = this.props;

    if (!isLoaded(vocabs)) {
      return (
        <p className="text-center mt-4">Loading ..</p>
      )
    } else if (isEmpty(vocabs)) {
      return (
        <p className="text-center mt-4">List is empty</p>
      )
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col pt-4">
              {this.props.learningInProgress
                ? <Learning />
                : <Start
                    vocabs={vocabs}
                    onStart={this.start}
                  /> }

            </div>
          </div>
        </div>
      )
    }
  }
}
