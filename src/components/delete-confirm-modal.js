import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import { editVocabModalShow } from '../actions/edit-vocab-modal'
import { deleteConfirmModalHide } from '../actions/delete-confirm-modal'

export const DeleteConfirmModal = () => {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const {
    id,
    vocab
  } = useSelector(state => state.deleteConfirmModal)

  const closeModal = () => {
    dispatch(deleteConfirmModalHide())
    dispatch(editVocabModalShow(id, vocab))
  }

  const deleteVocab = () => {
    firebase.remove(`vocabs/${id}`)
    dispatch(deleteConfirmModalHide())
  }

  return (
    <Modal
      isOpen={!!vocab}
    >
      {vocab &&
        <>
          <ModalHeader toggle={closeModal}>Delete "{vocab.lang1}"</ModalHeader>
          <ModalBody>
            <p>Sure to delete "{vocab.lang1}" : "{vocab.lang2}"?</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={closeModal}>Cancel</Button>
            <Button color='danger' onClick={deleteVocab}>Yes, delete</Button>
          </ModalFooter>
        </>}
    </Modal>
  )
}
