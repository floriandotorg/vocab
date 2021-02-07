import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirebase, useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { Spinner, Button } from 'reactstrap'
import { Speak } from '../../speak'
import { editVocabModalShow } from '../../../actions/edit-vocab-modal'
import {
  learningNextCard,
  learningTurnCard,
} from '../../../actions/learning'

export const Card = ({ vocab }) => {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const currentSide = useSelector(state => state.learning.currentSide)
  useFirebaseConnect([
    'vocabs'
  ])

  const next = level => () => {
    const data = (() => {
      switch (level) {
        default:
          return {
            proficiency: 0,
            countdown: 1
          }
        case 2:
          return {
            proficiency: 0,
            countdown: 2
          }
        case 3:
          return {
            proficiency: 0,
            countdown: 3
          }
        case 4:
          return {
            proficiency: 0,
            countdown: 7
          }
        case 5:
          return {
            proficiency: vocab.value.proficiency + 1,
            countdown: (() => {
              switch(vocab.value.proficiency) {
                case 0:
                  return 15
                case 1:
                  return 30
                default:
                  return 100
              }
            })()
          }
      }
    })()

    firebase.set(`vocabs/${vocab.key}`, {
      ...vocab.value,
      ...data
    })

    dispatch(learningNextCard())
  }

  const keyup = ({ key }) => {
    const num = parseInt(key)
    if (num > 0 && num < 6) {
      next(num)()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', keyup)
    return () => {
      window.removeEventListener('keyup', keyup)
    }
  }, [vocab])

  useEffect(() => {
    if (vocab.value.countdown > 1) {
      setTimeout(() => {
        firebase.set(`vocabs/${vocab.key}`, {
          ...vocab.value,
          countdown: vocab.value.countdown - 1
        })

        console.log(`counted down on ${vocab.key}`)

        dispatch(learningNextCard())
      })
    }
  }, [vocab.key])

  if (vocab.value.countdown < 2) {
    return (
      <div className='mt-4 w-50 w-md-100 mx-auto'>
        <div
          className='vocab-card'
          onClick={() => dispatch(learningTurnCard())}
        >
          <p>
            {(isLoaded(vocab) ? vocab.value[`lang${currentSide}`] : 'Loading').split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>
            })}
          </p>
        </div>

        <div className='d-flex mt-4'>
          <Button
            style={{border: 'none', backgroundColor: '#BF62A6'}}
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={next(1)}
          >
            1
          </Button>

        <Button
            style={{border: 'none', backgroundColor: '#F28C33'}}
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={next(2)}
          >
            2
          </Button>

          <Button
            style={{border: 'none', backgroundColor: '#F5D63D'}}
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={next(3)}
          >
            3
          </Button>

          <Button
            style={{border: 'none', backgroundColor: '#79C267'}}
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={next(4)}
          >
            4
          </Button>

          <Button
            style={{border: 'none', backgroundColor: '#459BA8'}}
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={next(5)}
          >
            5
          </Button>
        </div>

        <div className='d-flex mt-4'>
          <Button
            color='light'
            size='small'
            className='flex-grow-1 flex-basis-0 mr-1'
            onClick={() => dispatch(editVocabModalShow(vocab.key, vocab.value, false))}
          >
            Bearbeiten
          </Button>

          <Speak
            className='ml-1'
            word={vocab.value.lang1}
          />
        </div>
      </div>
    )
  } else {
    return <div className='mt-5 pt-5 text-center'><Spinner color='primary' /></div>
  }
}
