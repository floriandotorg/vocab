import _ from 'lodash'
import React, { useState, useRef } from 'react'
import { Button } from 'reactstrap'
import { ispeech } from '../config'

export const Speak = ({ className, word }) => {
  const audio = useRef()
  const [playing, setPlaying] = useState(false)

  const speak = () => {
    const wordSanitized = _(word.replace(/(\(|\))/g, '').replace(/\//g, '. ')).split(/(?:\r\n|\r|\n)/).map(_.trim).compact().join('. ')

    const url = `https://api.ispeech.org/api/rest?apikey=${ispeech}&action=convert&voice=eurportuguesefemale&speed=-5&text=${encodeURI(wordSanitized)}`

    // prevent double loading and waste of credits
    if (audio.current.src !== url) {
      audio.current.src = url
    }

    audio.current.play()
  }

  const stop = () => {
    audio.current.pause()
    audio.current.currentTime = 0
    setPlaying(false)
  }

  return (
    <Button
      tabIndex='-1'
      size='small'
      color='light'
      className={`flex-grow-1 flex-basis-0 ${className}`}
      onClick={playing ? stop : speak}
    >
      { playing ? 'Playing ..' : 'Speak' }
      <audio ref={audio} onPlay={() => setPlaying(true)} onEnded={() => setPlaying(false)} />
    </Button>
  )
}
