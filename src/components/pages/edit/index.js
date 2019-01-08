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
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  search = event => {
    this.setState({
      search: event.target.value,
    })
  }

  editVocab = (id, vocab) => () => {
    this.props.editVocabModalShow(id, vocab);
  }

  render() {
    const { firebase, vocabs } = this.props;
    const search = this.state.search.trim().toLowerCase();
    let filteredVocabs = (vocabs || []).slice().reverse();

    if (search.length > 1) {
      filteredVocabs = filteredVocabs.filter(v => v.value.lang1.trim().toLowerCase().includes(search) || v.value.lang2.trim().toLowerCase().includes(search));
    }

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
        <div className="container pt-4">
          <div className="row">
            <div className="col">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" value={this.state.search} onChange={this.search} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <table className="table table-striped table-hover vocab-table mt-3">
                <thead>
                  <tr>
                    <th scope="col">Lv.</th>
                    <th scope="col">Deutsch</th>
                    <th scope="col">Portugiesisch</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVocabs.map(({ value, key }, ind) => (
                    <Row
                      key={`${key}-${ind}`}
                      id={key}
                      vocab={value}
                      onEdit={this.editVocab(key, value)}
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
