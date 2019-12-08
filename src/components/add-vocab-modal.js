import React, { useRef, useEffect } from 'react'
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
  addVocabModalHide,
  addVocabModalSetLang1,
  addVocabModalSetLang2,
  addVocabModalClear,
} from '../actions/add-vocab-modal'

export const AddVocabModal = () => {
  const lang1Ref = useRef()
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const {
    show: modalOpen,
    lang1,
    lang2,
  } = useSelector(state => state.addVocabModal)

  useEffect(() => {
    setTimeout(() => lang1Ref.current && lang1Ref.current.focus())
  }, [modalOpen])

  const closeModal = () => {
    dispatch(addVocabModalHide())
  }

  const addVocab = event => {
    firebase.push('vocabs', {
      level: 0,
      lang1: lang1.trim(),
      lang2: lang2.trim(),
    })

    dispatch(addVocabModalClear())
    lang1Ref.current.focus()

    event.preventDefault()
  }

  const lang1Change = event => {
    dispatch(addVocabModalSetLang1(event.target.value))
  }

  const lang2Change = event => {
    dispatch(addVocabModalSetLang2(event.target.value))
  }

  return (
    <Modal
      isOpen={modalOpen}
    >
      <Form onSubmit={addVocab}>
        <ModalHeader toggle={closeModal}>Add Vocab</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for='portguese'>Portugisisch:</Label>
            <Input type='textarea' id='portguese' value={lang1} onChange={lang1Change} ref={lang1Ref} required />
            <div className='d-flex mt-2'>
              <Speak word={lang1} />
            </div>
          </FormGroup>

          <FormGroup>
            <Label for='german'>Deutsch:</Label>
            <Input type='textarea' id='german' value={lang2} onChange={lang2Change} required />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={closeModal}>Close</Button>
          <Button color='primary'>Add Vocab</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}
