import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirebase, useFirebaseConnect, getVal, isLoaded } from 'react-redux-firebase'
import { Button } from 'reactstrap'
import { Speak } from '../../speak'
import { editVocabModalShow } from '../../../actions/edit-vocab-modal'
import {
  learningNextCard,
  learningTurnCard,
} from '../../../actions/learning'

export const Card = ({ vocabId }) => {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const vocab = useSelector(state => getVal(state.firebase.data, `vocabs/${vocabId}`))
  const currentSide = useSelector(state => state.learning.currentSide)
  useFirebaseConnect([
    'vocabs'
  ])

  const correct = () => {
    firebase.set(`vocabs/${vocabId}`, {
      ...vocab,
      level: vocab.level + 1,
    })

    dispatch(learningNextCard())
  }

  const incorrect = () => {
    firebase.set(`vocabs/${vocabId}`, {
      ...vocab,
      level: 0,
    })

    dispatch(learningNextCard())
  }

  return (
    <div className='mt-4 w-50 w-md-100 mx-auto'>
      <div
        className='vocab-card'
        onClick={() => dispatch(learningTurnCard())}
      >
        <p>
          {(isLoaded(vocab) ? vocab[`lang${currentSide}`] : 'Loading').split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })}
        </p>
      </div>

      <div className='d-flex mt-4'>
        <Button
          color='success'
          className='flex-grow-1 flex-basis-0 mr-1'
          onClick={correct}
        >
          Richtig
        </Button>

        <Button
          color='danger'
          className='flex-grow-1 flex-basis-0 ml-1'
          onClick={incorrect}
        >
          Falsch
        </Button>
      </div>

      <div className='d-flex mt-4'>
        <Button
          color='light'
          size='small'
          className='flex-grow-1 flex-basis-0 mr-1'
          onClick={() => dispatch(editVocabModalShow(vocabId, vocab, false))}
        >
          Bearbeiten
        </Button>

        <Speak
          className='ml-1'
          word={vocab.lang1}
        />
      </div>
    </div>
  )
}
