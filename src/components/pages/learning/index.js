import _ from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import { Start } from './start'
import { Learning } from './learning'
import { learningStart } from '../../../actions/learning'

export const Learn = () => {
  const dispatch = useDispatch()
  const vocabs = useSelector(state => state.firebase.ordered.vocabs)
  const learningInProgress = !!useSelector(state => state.learning.vocabs)
  useFirebaseConnect([
    'vocabs'
  ])

  const start = level => () => {
    dispatch(learningStart(_(vocabs).filter(['value.level', level]).map('key').value()))
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
      <Container>
        <Row>
          <Col className="pt-4">
            {learningInProgress
              ? <Learning />
              : <Start
                  vocabs={vocabs}
                  onStart={start}
                /> }
          </Col>
        </Row>
      </Container>
    )
  }
}
