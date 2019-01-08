import React, { Component } from 'react'
import Modal from 'react-bootstrap4-modal'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { editVocabModalShow } from '../actions/edit-vocab-modal'
import { deleteConfirmModalHide } from '../actions/delete-confirm-modal'

@withFirebase
@connect(
  state => ({
    modalOpen: !!state.deleteConfirmModal.vocab,
    id: state.deleteConfirmModal.id,
    vocab: state.deleteConfirmModal.vocab,
  }),
  dispatch => ({
    editVocabModalShow: (id, vocab) => dispatch(editVocabModalShow(id, vocab)),
    deleteConfirmModalHide: () => dispatch(deleteConfirmModalHide()),
  })
)
export default class DeleteConfirmModal extends Component {
  closeModal = () => {
    const { id, vocab, deleteConfirmModalHide, editVocabModalShow } = this.props;
    deleteConfirmModalHide();
    editVocabModalShow(id, vocab);
  }

  deleteVocab = () => {
    const { firebase, id, deleteConfirmModalHide } = this.props;
    firebase.remove(`vocabs/${id}`);
    deleteConfirmModalHide();
  }

  render() {
    const { modalOpen, vocab } = this.props;

    return (
      <Modal
        visible={modalOpen}
        onClickBackdrop={this.closeModal}
      >
        {modalOpen &&
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete "{vocab.lang1}"</h5>
              <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Sure to delete "{vocab.lang1}" : "{vocab.lang2}"?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={this.closeModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={this.deleteVocab}>Yes, delete</button>
            </div>
        </div>}
      </Modal>
    )
  }
}
