import _ from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap'
import { Start } from './start'
import { Learning } from './learning'
import { learningStart } from '../../../actions/learning'

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const Learn = () => {
  const dispatch = useDispatch()
  const vocabs = useSelector(state => state.firebase.ordered.vocabs)
  const learningInProgress = !!useSelector(state => state.learning.vocabs)
  useFirebaseConnect([
    'vocabs'
  ])

  const start = () => {
    dispatch(learningStart(vocabs))
  }

  const firebase = useFirebase()
  const convert = () => {
    const stageToCountdown = stage => {
      switch (stage) {
        case 0:
          return 1
        case 1:
          return 3 - getRandomInt(0, 2)
        case 2:
          return 7 - getRandomInt(0, 2)
        case 3:
          return 30 - getRandomInt(-10, 10)
        default:
          return 1
      }
    }
    for (const vocab of vocabs) {
      firebase.set(`vocabs/${vocab.key}`, {
        ...vocab.value,
        countdown: stageToCountdown(vocab.value.level),
        proficiency: vocab.value.level > 2 ? 1 : 0,
      })
      console.log(`converted ${vocab.key}`)
    }
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

        <Row>
          <Button style={{display: 'none'}} onClick={convert}>Convert</Button>
        </Row>
      </Container>
    )
  }
}
