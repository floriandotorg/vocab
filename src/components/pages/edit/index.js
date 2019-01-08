import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { editVocabModalShow } from '../../../actions/edit-vocab-modal'
import Row from './row'

@withFirebase
@firebaseConnect(() => [
  { path: 'vocabs', queryParams: [ 'orderByKey' ] },
])
@connect(
  state => ({
    vocabs: state.firebase.ordered.vocabs,
  }),
  dispatch => ({
    editVocabModalShow: (id, vocab) => dispatch(editVocabModalShow(id, vocab)),
  })
)
export default class Index extends Component {
  deleteVocab = id => () => {
    this.props.firebase.remove(`vocabs/${id}`);
  }

  editVocab = (id, vocab) => () => {
    this.props.editVocabModalShow(id, vocab);
  }

  render() {
    const { vocabs, firebase } = this.props;

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
            <div className="col">
              <table className="table table-striped table-hover mt-4">
                <thead>
                  <tr>
                    <th scope="col" style={{width: '5%'}}>Lv.</th>
                    <th scope="col" style={{width: '45%'}}>Deutsch</th>
                    <th scope="col" style={{width: '45%'}}>Portugiesisch</th>
                    <th scope="col" style={{width: '5%'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {vocabs.reverse().map(({ value, key }, ind) => (
                    <Row
                      key={`${key}-${ind}`}
                      id={key}
                      vocab={value}
                      onEdit={this.editVocab(key, value)}
                      onDelete={this.deleteVocab(key)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>{vocabs.length} words total</p>
            </div>
          </div>
        </div>
      )
    }
  }
}
