import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { Speak } from './speak'
import {
  deleteConfirmModalShow,
} from '../actions/delete-confirm-modal'
import {
  editVocabModalHide,
  editVocabModalSetVocab,
} from '../actions/edit-vocab-modal'


export const  EditVocabModal = () => {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const {
    id,
    vocab
  } = useSelector(state => state.editVocabModal)

  const closeModal = () => {
    dispatch(editVocabModalHide())
  }

  const save = event => {
    firebase.set(`vocabs/${id}`, {
      level: vocab.level,
      lang1: vocab.lang1.trim(),
      lang2: vocab.lang2.trim(),
    })

    dispatch(editVocabModalHide())

    event.preventDefault()
  }

  const deleteVocab = () => {
    dispatch(deleteConfirmModalShow(id, vocab))
  }

  const lang1Change = event => {
    dispatch(editVocabModalSetVocab({
      ...vocab,
      lang1: event.target.value,
    }))
  }

  const lang2Change = event => {
    dispatch(editVocabModalSetVocab({
      ...vocab,
      lang2: event.target.value,
    }))
  }

  const levelChange = event => {
    dispatch(editVocabModalSetVocab({
      ...vocab,
      level: parseInt(event.target.value),
    }))
  }

  return (
    <Modal
      isOpen={!!vocab}
    >
      {vocab && <Form onSubmit={save}>
        <ModalHeader toggle={closeModal}>Edit Vocab</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for='portguese'>Portugisisch:</Label>
            <Input type='textarea' id='portguese' value={vocab.lang1} onChange={lang1Change} required />
            <div className='d-flex mt-2'>
              <Speak word={vocab.lang1} />
            </div>
          </FormGroup>

          <FormGroup>
            <Label for='german'>Deutsch:</Label>
            <Input type='textarea' id='german' value={vocab.lang2} onChange={lang2Change} required />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' className='mr-auto' onClick={deleteVocab}>Delete</Button>
          <Button color='secondary' onClick={closeModal}>Close</Button>
          <Button color='primary'>Save</Button>
        </ModalFooter>
      </Form>}
    </Modal>
  )
}
