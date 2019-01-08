import React, { Component } from 'react'
import Modal from 'react-bootstrap4-modal'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import Speak from './speak'
import {
  deleteConfirmModalShow,
} from '../actions/delete-confirm-modal'
import {
  editVocabModalHide,
  editVocabModalSetVocab,
} from '../actions/edit-vocab-modal'

@withFirebase
@connect(
  state => ({
    modalOpen: !!state.editVocabModal.vocab,
    id: state.editVocabModal.id,
    vocab: state.editVocabModal.vocab,
    editLevel: state.editVocabModal.editLevel,
  }),
  dispatch => ({
    editVocabModalHide: () => dispatch(editVocabModalHide()),
    editVocabModalSetVocab: vocab => dispatch(editVocabModalSetVocab(vocab)),
    deleteConfirmModalShow: (id, vocab) => dispatch(deleteConfirmModalShow(id, vocab)),
  })
)
export default class EditVocabModal extends Component {
  closeModal = () => {
    this.props.editVocabModalHide();
  }

  save = event => {
    const { firebase, id, vocab, editVocabModalHide } = this.props;

    firebase.set(`vocabs/${id}`, {
      ...vocab,
      lang1: vocab.lang1.trim(),
      lang2: vocab.lang2.trim(),
    });

    editVocabModalHide();

    event.preventDefault();
  }

  deleteVocab = () => {
    const { id, vocab, editVocabModalHide, deleteConfirmModalShow } = this.props;
    deleteConfirmModalShow(id, vocab);
  }

  lang1Change = event => {
    const { editVocabModalSetVocab, vocab } = this.props;

    editVocabModalSetVocab({
      ...vocab,
      lang1: event.target.value,
    });
  }

  lang2Change = event => {
    const { editVocabModalSetVocab, vocab } = this.props;

    editVocabModalSetVocab({
      ...vocab,
      lang2: event.target.value,
    });
  }

  levelChange = event => {
    const { editVocabModalSetVocab, vocab } = this.props;

    editVocabModalSetVocab({
      ...vocab,
      level: parseInt(event.target.value),
    });
  }

  render() {
    const { modalOpen, vocab, editLevel } = this.props;

    return (
      <Modal
        visible={modalOpen}
        onClickBackdrop={this.closeModal}
      >
        {modalOpen && <form onSubmit={this.save}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Vocab</h5>
            <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="portguese" className="col-form-label">Portugisisch:</label>
              <textarea className="form-control" id="portguese" value={vocab.lang1} onChange={this.lang1Change} required />
              <div className="d-flex mt-2">
                <Speak word={vocab.lang1} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="german" className="col-form-label">Deutsch:</label>
              <textarea className="form-control" id="german" value={vocab.lang2} onChange={this.lang2Change} required />
            </div>

            {editLevel && <div className="form-group">
              <label htmlFor="level" className="col-form-label">Level:</label>
              <input type="number" className="form-control" id="level" step="1" value={vocab.level} onChange={this.levelChange} required />
            </div>}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger mr-auto" onClick={this.deleteVocab}>Delete</button>
            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>}
      </Modal>
    )
  }
}
