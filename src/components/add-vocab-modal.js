import React, { Component } from 'react'
import Modal from 'react-bootstrap4-modal'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import Speak from './speak'
import {
  addVocabModalHide,
  addVocabModalSetLang1,
  addVocabModalSetLang2,
  addVocabModalClear,
} from '../actions/add-vocab-modal'

@withFirebase
@connect(
  state => ({
    modalOpen: state.addVocabModal.show,
    lang1: state.addVocabModal.lang1,
    lang2: state.addVocabModal.lang2,
  }),
  dispatch => ({
    addVocabModalHide: () => dispatch(addVocabModalHide()),
    addVocabModalSetLang1: text => dispatch(addVocabModalSetLang1(text)),
    addVocabModalSetLang2: text => dispatch(addVocabModalSetLang2(text)),
    addVocabModalClear: () => dispatch(addVocabModalClear()),
  })
)
export default class AddVocabModal extends Component {
  constructor(props) {
    super(props);
    this.lang1Ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.modalOpen && this.props.modalOpen) {
      setTimeout(() => this.lang1Ref.current.focus());
    }
  }

  closeModal = () => {
    this.props.addVocabModalHide();
  }

  addVocab = event => {
    this.props.firebase.push('vocabs', {
      level: 0,
      lang1: this.props.lang1,
      lang2: this.props.lang2,
    });

    this.props.addVocabModalClear();
    this.lang1Ref.current.focus();

    event.preventDefault();
  }

  lang1Change = event => {
    this.props.addVocabModalSetLang1(event.target.value);
  }

  lang2Change = event => {
    this.props.addVocabModalSetLang2(event.target.value);
  }

  render() {
    return (
      <Modal
        visible={this.props.modalOpen}
        onClickBackdrop={this.closeModal}
      >
        <form onSubmit={this.addVocab}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Vocab</h5>
            <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <div className="form-group">
                <label htmlFor="portguese" className="col-form-label">Portugisisch:</label>
                <textarea className="form-control" id="portguese" value={this.props.lang1} onChange={this.lang1Change} ref={this.lang1Ref} required />
                <div className="d-flex mt-2">
                  <Speak word={this.props.lang1} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="german" className="col-form-label">Deutsch:</label>
                <textarea className="form-control" id="german" value={this.props.lang2} onChange={this.lang2Change} required />
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
            <button className="btn btn-primary">Add Vocab</button>
          </div>
        </form>
      </Modal>
    )
  }
}
